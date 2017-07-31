import Layout from './pages/Layout';

function load(load) {
  return async (_nextState, callback) => {
    try {
      const module = await load();
      callback(null, module.default);
    } catch (err) {
      console.error(err);
      callback(err, null);
    }
  };
}

export default [{
  component: Layout,
  childRoutes: [{
    path: '/',
    getComponent: load(() => import('./pages/Dashboard')),
  }, {
    path: '/clients/new',
    getComponent: load(() => import('./pages/NewClient')),
  }, {
    path: '/clients/:id',
    getComponent: load(() => import('./pages/Client')),
  }]
}];
