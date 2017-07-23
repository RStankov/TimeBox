const {MongoClient} = require('mongodb');

// TODO(rstankov): Move to ENV
const MONGO_URL = 'mongodb://127.0.0.1:27017/hackernews';

module.exports = async () => {
  const db = await MongoClient.connect(MONGO_URL);

  return {
    Clients: db.collection('client'),
  };
}
