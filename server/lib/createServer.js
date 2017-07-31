const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const { execute, subscribe } = require('graphql');
const { createServer } = require('http');
const cors = require('cors');

const createMongo = require('./createMongoConnection');
const schema = require('./schema');

module.exports = async (port) => {
  const mongo = await createMongo();

  // TODO(rstankov): Move to middlewares
  const buildOptions = async (req, res) => {
    return {
      context: {
        mongo
      },
      schema,
    };
  };

  const app = express();

  // TODO(rstankov): Add index
  // TODO(rstankov): Add health url

  app.use('/graphql', cors(), bodyParser.json(), graphqlExpress(buildOptions));


  // TODO(rstankov): Enable only in development
  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql',
      // Replace this e-mail with another to test with another user in your db.
      passHeader: `'Authorization': 'bearer token'`,
    }),
  );

  const server = createServer(app);
  server.listen(port, () => {
    console.log(`Hackernews GraphQL server running on port ${port}.`);
  });

  return app;
};
