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
    getComponent: load(() => import('./pages/Clients/New')),
  }, {
    path: '/clients/:id',
    getComponent: load(() => import('./pages/Clients/Show')),
  }, {
    path: '/clients/:id/edit',
    getComponent: load(() => import('./pages/Clients/Edit')),
  }, {
    path: '/clients/:id/info',
    getComponent: load(() => import('./pages/Clients/Info')),
  }, {
    path: '/clients/:clientId/time-logs/new',
    getComponent: load(() => import('./pages/TimeLogs/New')),
  }]
}];
