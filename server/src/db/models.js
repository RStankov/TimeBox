const mongoose = require('mongoose');
const idexists = require('mongoose-idexists');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

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
    type: String,
    required: true,
    match: [/\d{4}-\d{2}-\d{2}/, 'should be in 0000-00-00 format'],
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

module.exports = {
  Client,
  TimeLog,
};
