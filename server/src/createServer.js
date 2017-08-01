const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const { execute, subscribe } = require('graphql');
const { createServer } = require('http');
const cors = require('cors');

const createDatabase = require('./db');
const schema = require('./graphql');

module.exports = async ({ port, databaseUrl }) => {
  const db = await createDatabase(databaseUrl);

  // TODO(rstankov): Move to middlewares
  const buildOptions = async (req, res) => {
    return {
      context: {
        db
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
    console.log(`GraphQL server running on port ${port}.`);
  });

  return app;
};
