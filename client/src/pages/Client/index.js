import React from 'react';
import { graphql, gql } from 'react-apollo';
import { Header, Loader } from 'semantic-ui-react';

export function Page({ data: { loading, client } }) {
  if (loading) {
    return <Loader active inline="centered" />;
  }

  return (
    <article>
      <Header as="h1">
        {client.name}
      </Header>
    </article>
  );
}

const QUERY = gql`
  query ClientPage($id: ID!) {
    client(id: $id) {
      id
      name
    }
  }
`;

export default graphql(QUERY, {
  options: ({ params }) => ({ variables: { id: params.id } }),
})(Page);
