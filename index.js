// TODO(rstankov): Convert to ES6 imports
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const { execute, subscribe } = require('graphql');
const { createServer } = require('http');

const schema = require('./lib/schema');

// TODO(rstankov): Move to middlewares
const buildOptions = async (req, res) => {
  return {
    context: {},
    schema,
  };
};

const app = express();

// TODO(rstankov): Add index
// TODO(rstankov): Add health url

app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions));


// TODO(rstankov): Enable only in development
app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    // Replace this e-mail with another to test with another user in your db.
    passHeader: `'Authorization': 'bearer token'`,
  }),
);

const PORT = 3000; // TODO(rstankov): Convert to env variable
const server = createServer(app);
server.listen(PORT, () => {
  console.log(`Hackernews GraphQL server running on port ${PORT}.`);
});
