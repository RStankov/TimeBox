import React from 'react';
import { Header } from 'semantic-ui-react';
import { graphql, gql } from 'react-apollo';

import { Form } from 'components/Form';
import theme from 'utils/formTheme';
import validations from 'utils/clientValidations';
import paths from 'paths';
import { addToCollection } from 'utils/graphql';
import withPush from 'utils/withPush';

const fields = {
  name: '',
};

export function Page({ submit, afterSubmit }) {
  return (
    <article>
      <Header as="h1">New Client</Header>
      <Form
        defaultValues={fields}
        validations={validations}
        submit={submit}
        afterSubmit={afterSubmit}
        theme={theme}>
        <Form.Field name="name" />
        <Form.Field name="hourlyRate" label="Hourly rate" input="number" />
        <Form.Field name="notes" input="textarea" />
        <Form.Submit>Create</Form.Submit>
      </Form>
    </article>
  );
}

const MUTATION = gql`
  mutation ClientsNewPage($input: CreateClientInput!) {
    response: createClient(input: $input) {
      node {
        id
        name
      }
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
      async submit(input) {
        const { data: { response } } = await mutate({
          variables: { input },
          updateQueries: {
            Layout: addToCollection('allClients'),
          },
        });
        return response;
      },
      afterSubmit(node) {
        ownProps.push(paths.clients.show(node));
      },
    }),
  })(Page),
);
