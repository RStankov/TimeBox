import React from 'react';
import { Header, Loader } from 'semantic-ui-react';
import { graphql, gql } from 'react-apollo';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { Form } from 'components/Form';
import theme from 'utils/formTheme';
import validations from 'utils/clientValidations';
import paths from 'paths';

export function Page({ submit, afterSubmit, data: { loading, client } }) {
  if (loading) {
    return <Loader active inline="centered" />;
  }

  const fields = { name: client.name };

  return (
    <article>
      <Header as="h1">Edit Client</Header>
      <Form
        defaultValues={fields}
        validations={validations}
        submit={submit}
        afterSubmit={afterSubmit}
        theme={theme}>
        <Form.Field name="name" />
        <Form.Submit>Update</Form.Submit>
      </Form>
    </article>
  );
}

const MUTATION = gql`
  mutation UpdateClient($input: UpdateClientInput!) {
    response: updateClient(input: $input) {
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
})(
  connect(null, { push })(
    graphql(MUTATION, {
      props: ({ ownProps, mutate }) => ({
        async submit(input) {
          const { data: { response } } = await mutate({
            variables: { input: { ...input, id: ownProps.params.id } },
          });
          return response;
        },
        afterSubmit(node) {
          ownProps.push(paths.client(node));
        },
      }),
    })(Page),
  ),
);
