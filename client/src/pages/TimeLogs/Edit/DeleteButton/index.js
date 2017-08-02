import React from 'react';
import { graphql, gql } from 'react-apollo';

import paths from 'paths';
import withPush from 'utils/withPush';

export function Button({ destroy }) {
  return <button onClick={destroy}>Delete</button>;
}

const MUTATION = gql`
  mutation DestroyTimeLog($input: DestroyTimeLogInput!) {
    response: destroyTimeLog(input: $input) {
      errors {
        field
        message
      }
    }
  }
`;

export default withPush(
  graphql(MUTATION, {
    props: ({ ownProps, mutate }) => ({
      async destroy() {
        if (!window.confirm('Are you sure?')) {
          return;
        }

        await mutate({
          variables: { input: { id: ownProps.timeLog.id } },
        });

        ownProps.push(paths.clients.show(ownProps.timeLog.client));
      },
    }),
  })(Button),
);
