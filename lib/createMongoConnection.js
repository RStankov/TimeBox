const mongodb = require('mongodb');

// TODO(rstankov): Move to ENV
const MONGO_URL = 'mongodb://127.0.0.1:27017/hackernews';

module.exports = async () => {
  const db = await mongodb.MongoClient.connect(MONGO_URL);

  return {
    id(id) {
      return new mongodb.ObjectID(id);
    },
    Clients: db.collection('client'),
  };
};
