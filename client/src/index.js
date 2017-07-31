import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  ApolloProvider,
  createNetworkInterface,
  ApolloClient,
} from 'react-apollo';

const networkInterface = createNetworkInterface({
  // TODO(rstankov): make configurable
  uri: 'http://localhost:3001/graphql',
});

const client = new ApolloClient({
  networkInterface,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
