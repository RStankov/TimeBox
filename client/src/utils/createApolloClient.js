import {
  ApolloClient,
  createNetworkInterface,
} from 'react-apollo';


function dataIdFromObject(result) {
  if (result.id && result.__typename) {
    return result.__typename + result.id;
  }

  return null;
}

export default function createApolloClient({ uri }) {
  const networkInterface = createNetworkInterface({
    uri,
  });

  return new ApolloClient({
    networkInterface,
    dataIdFromObject,
    queryDeduplication: true,
  });
}
