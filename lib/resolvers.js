module.exports = {
  Query: {
    allClients: (_root, _args, { mongo }) => {
      return mongo.Clients.find({}).toArray();
    },
  },

  Mutation: {
    createClient: async (_root, { input }, { mongo }) => {
      // TODO(rstankov): Validation
      const response = await mongo.Clients.insert(input);

      return {
        node: Object.assign(input, { id: response.insertedIds[0] }),
        errors: [],
      };
    },
  },

  Client: {
    id: root => root._id,
  },
};
