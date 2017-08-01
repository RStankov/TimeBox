const _ = require('lodash');

module.exports = {
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
      model.findByIdAndUpdate(id, { $set: set }, { new: true }, (err, node) => {
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

  async destroy(model, { id }) {
    await mongo.Client.findByIdAndRemove(input.id);

    return {
      errors: [],
    };
  },
};

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
