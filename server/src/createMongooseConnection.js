const mongoose = require('mongoose');
const idexists = require('mongoose-idexists');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

const _ = require('lodash');

// TODO(rstankov): Move to ENV
const MONGO_URL = 'mongodb://127.0.0.1:27017/hackernews';

const ClientSchema = new Schema({
  name: {
    type: String,
    minlength: [1, 'is required'],
    unique: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'should be more than 0'],
  },
  active: {
    type: Boolean,
    default: true,
  },
  notes: {
    type: String,
    default: '',
  },
});

const TimeLogSchema = new Schema({
  clientId: {
    type: ObjectId,
    ref: 'Client',
    require: true,
  },
  description: {
    type: String,
    default: '',
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
    match: [/\d{2}:\d{2}/, 'should be in 00:00 format'],
  },
  endTime: {
    type: String,
    required: true,
    match: [/\d{2}:\d{2}/, 'should be in 00:00 format'],
  },
  billableHours: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'should be more than 0'],
  },
});

idexists.forPath(TimeLogSchema.path('clientId'));

const Client = mongoose.model('Client', ClientSchema);
const TimeLog = mongoose.model('TimeLog', TimeLogSchema);

function mapErrors(err) {
  // NOTE(rstankov): E11000 duplicate key error
  if (err.code === 11000) {
    // NOTE(rstankov): Message format:
    //   -> 'E11000 duplicate key error collection: myapp.clients index: name_1 dup key
    const match = err.message.match(/index: (\w+)_/);
    const name = match ? match[1] : 'base';

    return [
      {
        field: name,
        message: 'should be unique',
      },
    ];
  }

  if (!err.errors) {
    return [
      {
        field: 'base',
        message: 'internal error',
      },
    ];
  }

  return Object.keys(err.errors).map(key => ({
    field: key,
    message: err.errors[key].message,
  }));
}

module.exports = async () => {
  await mongoose.connect('mongodb://localhost/myapp', {
    useMongoClient: true,
  });

  return {
    Client,
    TimeLog,

    create(model, input) {
      return new Promise(cb => {
        model.create(input, (err, node) => {
          if (err) {
            cb({
              node: null,
              errors: mapErrors(err),
            });
          } else {
            cb({
              node,
              errors: [],
            });
          }
        });
      });
    },

    update(model, input) {
      const id = input.id;
      const set = _.omit(input, 'id');

      return new Promise(cb => {
        model.findByIdAndUpdate(
          id,
          { $set: set },
          { new: true },
          (err, node) => {
            if (err) {
              cb({
                node: null,
                errors: mapErrors(err),
              });
            } else {
              cb({
                node,
                errors: [],
              });
            }
          },
        );
      });
    },

    async destroy(model, { id }) {
      await mongo.Client.findByIdAndRemove(input.id);

      return {
        errors: [],
      };
    },
  };
};
