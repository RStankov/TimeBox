import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ApolloProvider } from 'react-apollo';

import createReduxStore from 'utils/createReduxStore';
import createApolloClient from 'utils/createApolloClient';

import routes from 'routes';

const apollo = createApolloClient({
  uri: 'http://localhost:3001/graphql',
});

const redux = createReduxStore({
  apollo,
});

const history = syncHistoryWithStore(browserHistory, redux);

ReactDOM.render(
  <Provider store={redux}>
    <ApolloProvider client={apollo}>
      <Router history={history} routes={routes} />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root'),
);
