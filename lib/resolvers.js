module.exports = {
  Query: {
    allClients: (_root, _args, _context) => {
      return [{ _id: '1', name: 'CoderBox' }];
    },
  },

  Client: {
    id: root => root._id,
  },
};
