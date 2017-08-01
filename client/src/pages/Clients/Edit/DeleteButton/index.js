import React from 'react';
import { graphql, gql } from 'react-apollo';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import paths from 'paths';
import { removeFromCollection } from 'utils/graphql';

export function Button({ destroy }) {
  return <button onClick={destroy}>Delete</button>;
}

const MUTATION = gql`
  mutation DestroyClient($input: DestroyClientInput!) {
    response: destroyClient(input: $input) {
      errors {
        field
        message
      }
    }
  }
`;

export default connect(null, { push })(
  graphql(MUTATION, {
    props: ({ ownProps, mutate }) => ({
      async destroy() {
        if (!window.confirm('Are you sure?')) {
          return;
        }

        await mutate({
          variables: { input: { id: ownProps.client.id } },
          updateQueries: {
            Layout: removeFromCollection('allClients', ownProps.client),
          },
        });

        ownProps.push(paths.dashboard());
      },
    }),
  })(Button),
);
