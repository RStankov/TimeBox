module.exports = {
  Query: {
    allClients(_root, _args, { mongo }) {
      return mongo.Client.find();
    },
    client(_root, { id }, { mongo }) {
      return mongo.Client.findById(id);
    },
    timeLog(_root, { id }, { mongo }) {
      return TimeLog.findById(id);
    },
  },

  Mutation: {
    createClient(_root, { input }, { mongo }) {
      return mongo.create(mongo.Client, input);
    },
    updateClient(_root, { input }, { mongo }) {
      return mongo.update(mongo.Client, input);
    },
    destroyClient(_root, { input }, { mongo }) {
      return mongo.destroy(model.Client, input);
    },

    createTimeLog(_root, { input }, { mongo }) {
      return mongo.create(mongo.TimeLog, input);
    },
    updateTimeLog(_root, { input }, { mongo }) {
      return mongo.update(mongo.TimeLog, input);
    },
    destroyTimeLog(_root, { input }, { mongo }) {
      return mongo.destroy(model.TimeLog, input);
    },
  },

  Client: {
    id: root => root._id,

    timeLogs({ _id }, _args, { mongo }) {
      return mongo.TimeLogs.find({ clientId: _id });
    },
  },

  TimeLog: {
    id: root => root._id,

    client({ clientId }, _args, { mongo }) {
      return mongo.Client.findById(id);
    },
  },
};
