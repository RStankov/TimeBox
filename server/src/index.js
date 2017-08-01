const createServer = require('./createServer');

createServer({
  port: process.env.PORT || 3000,
  databaseUrl: 'mongodb://127.0.0.1:27017/hackernews',
});
