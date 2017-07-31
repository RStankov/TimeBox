const { makeExecutableSchema } = require('graphql-tools');
const fs = require('fs');
const path = require('path');

const resolvers = require('./resolvers');

const typeDefs = [
  fs.readFileSync(path.join(__dirname, './schema.graphql'), 'utf8'),
];

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
