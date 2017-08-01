const mongoose = require('mongoose');
const _ = require('lodash');


const models = require('./models');
const repo = require('./repo');

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

module.exports = async (url) => {
  await mongoose.connect(url, {
    useMongoClient: true,
  });

  return _.extend({}, repo, models);
};
