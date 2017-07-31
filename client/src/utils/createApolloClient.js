import {
  ApolloClient,
  createNetworkInterface,
} from 'react-apollo';

export default function createApolloClient({ uri }) {
  const networkInterface = createNetworkInterface({
    uri,
  });

  return new ApolloClient({
    networkInterface,
  });
}
