import React from 'react';
import { Header } from 'semantic-ui-react';
import { graphql, gql } from 'react-apollo';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { Form } from 'components/Form';
import theme from 'utils/formTheme';
import validations from 'utils/clientValidations';
import paths from 'paths';

const fields = {
  name: '',
};

export function Page({ submit, afterSubmit }) {
  return (
    <article>
      <Header as="h1">New Client</Header>
      <Form
        fields={fields}
        validations={validations}
        submit={submit}
        afterSubmit={afterSubmit}
        theme={theme}>
        <Form.Field name="name" />
        <Form.Submit>Create</Form.Submit>
      </Form>
    </article>
  );
}

const MUTATION = gql`
  mutation CreateClient($input: CreateClientInput!) {
    response: createClient(input: $input) {
      node {
        id
        name
      }
      errors {
        field
        messages
      }
    }
  }
`;

export default connect(null, { push })(
  graphql(MUTATION, {
    props: ({ ownProps, mutate }) => ({
      async submit(input) {
        const { data: { response } } = await mutate({
          variables: { input },
        });
        return response;
      },
      afterSubmit(node) {
        ownProps.push(paths.client(node));
      },
    }),
  })(Page),
);
