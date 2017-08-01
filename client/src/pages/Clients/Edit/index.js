import React from 'react';
import { Header, Loader } from 'semantic-ui-react';
import { graphql, gql } from 'react-apollo';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Form } from 'components/Form';
import theme from 'utils/formTheme';
import validations from 'utils/clientValidations';
import paths from 'paths';
import DeleteButton from './DeleteButton';

export function Page({ submit, afterSubmit, data: { loading, client } }) {
  if (loading) {
    return <Loader active inline="centered" />;
  }

  const fields = _.pick(client, ['name', 'hourlyRate', 'notes']);

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
        <Form.Field name="hourlyRate" label="Hourly rate" input="number" />
        <Form.Field name="notes" input="textarea" />
        <Form.Submit>Update</Form.Submit>
      </Form>
      <hr />
      <p>
        <DeleteButton client={client} />
      </p>
    </article>
  );
}

const MUTATION = gql`
  mutation UpdateClient($input: UpdateClientInput!) {
    response: updateClient(input: $input) {
      node {
        id
        name
        hourlyRate
        notes
      }
      errors {
        field
        message
      }
    }
  }
`;

const QUERY = gql`
  query ClientsEditPage($id: ID!) {
    client(id: $id) {
      id
      name
      hourlyRate
      notes
    }
  }
`;

export default graphql(QUERY, {
  options: ({ params }) => ({
    variables: { id: params.id },
  }),
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
          ownProps.push(paths.clients.show(node));
        },
      }),
    })(Page),
  ),
);

