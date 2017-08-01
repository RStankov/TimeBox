module.exports = {
  Query: {
    allClients(_root, _args, { db }) {
      return db.Client.find();
    },
    client(_root, { id }, { db }) {
      return db.Client.findById(id);
    },
    timeLog(_root, { id }, { db }) {
      return db.TimeLog.findById(id);
    },
  },

  Mutation: {
    createClient(_root, { input }, { db }) {
      return db.create(db.Client, input);
    },
    updateClient(_root, { input }, { db }) {
      return db.update(db.Client, input);
    },
    destroyClient(_root, { input }, { db }) {
      return db.destroy(db.Client, input);
    },

    createTimeLog(_root, { input }, { db }) {
      return db.create(db.TimeLog, input);
    },
    updateTimeLog(_root, { input }, { db }) {
      return db.update(db.TimeLog, input);
    },
    destroyTimeLog(_root, { input }, { db }) {
      return db.destroy(db.TimeLog, input);
    },
  },

  Client: {
    id: root => root._id,

    timeLogs({ _id }, _args, { db }) {
      return db.TimeLogs.find({ clientId: _id });
    },
  },

  TimeLog: {
    id: root => root._id,

    client({ clientId }, _args, { db }) {
      return db.Client.findById(id);
    },
  },
};
