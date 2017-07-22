const { makeExecutableSchema } = require('graphql-tools');

const resolvers = {
  Query: {
    allClients: (_root, _args, _context) => {
      return [{ _id: '1', name: 'CoderBox' }];
    },
  },

  Client: {
    id: root => root._id,
  },
};

const typeDefs = `
  type Query {
    allClients: [Client!]!
  }
  type Client {
    id: ID!
    name: String!
  }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
