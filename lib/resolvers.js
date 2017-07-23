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
    destroyClient: async (_root, { input }, { mongo }) => {
      // TODO(rstankov): Validation
      const response = await mongo.Clients.deleteOne({ _id: mongo.id(input.id) });

      console.log(response);

      return {
        errors: [],
      };
    },
  },

  Client: {
    id: root => root._id,
  },
};
