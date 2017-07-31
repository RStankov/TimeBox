module.exports = {
  Query: {
    allClients: (_root, _args, { mongo }) => {
      return mongo.Clients.find({}).toArray();
    },
    client: (_root, args, { mongo }) => {
      return mongo.Clients.findOne({ _id: mongo.id(args.id) });
    },
    allTimeLogs: (_root, _args, { mongo }) => {
      return mongo.TimeLogs.find({}).toArray();
    },
    timeLog: (_root, args, { mongo }) => {
      return mongo.TimeLogs.findOne({ _id: mongo.id(args.id) });
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
    updateClient: async (_root, { input }, { mongo }) => {
      // TODO(rstankov): Validation
      // // TODO(rstankov): Remove `id` from input
      const response = await mongo.Clients.update(
        { _id: mongo.id(input.id) },
        { $set: input },
      );

      const client = await mongo.Clients.findOne({ _id: mongo.id(input.id) });

      return {
        node: client,
        errors: [],
      };
    },
    destroyClient: async (_root, { input }, { mongo }) => {
      // TODO(rstankov): Validation
      const response = await mongo.Clients.deleteOne({
        _id: mongo.id(input.id),
      });

      return {
        errors: [],
      };
    },

    createTimeLog: async (_root, { input: { clientId, description } }, { mongo }) => {
      // TODO(rstankov): Validation
      const response = await mongo.TimeLogs.insert({ clientId: mongo.id(clientId), description });

      return {
        node: { clientId, description, _id: response.insertedIds[0] },
        errors: [],
      };
    },
    updateTimeLog: async (_root, { input }, { mongo }) => {
      // TODO(rstankov): Validation
      // // TODO(rstankov): Remove `id` from input
      const response = await mongo.TimeLogs.update(
        { _id: mongo.id(input.id) },
        { $set: input },
      );

      const client = await mongo.TimeLogs.findOne({ _id: mongo.id(input.id) });

      return {
        node: client,
        errors: [],
      };
    },
    destroyTimeLog: async (_root, { input }, { mongo }) => {
      // TODO(rstankov): Validation
      const response = await mongo.TimeLogs.deleteOne({
        _id: mongo.id(input.id),
      });

      return {
        errors: [],
      };
    },
  },

  Client: {
    id: root => root._id,
    timeLogs: async ({ _id }, _args, { mongo }) => {
      return await mongo.TimeLogs.find({ clientId: mongo.id(_id) }).toArray();
    },
  },

  TimeLog: {
    id: root => root._id,
    client: async ({ clientId }, _args, { mongo }) => {
      return await mongo.Clients.findOne({ _id: mongo.id(clientId) });
    },
  },
};
