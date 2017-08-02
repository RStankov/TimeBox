import React from 'react';
import { graphql, gql, compose } from 'react-apollo';

import { Form } from 'components/Form';
import theme from 'utils/formTheme';
import validations from 'utils/timeLogValidations';
import paths from 'paths';
import withPush from 'utils/withPush';
import withPage from 'utils/withPage';
import Title from 'components/Title';

const fields = {
  startTime: '',
  endTime: '',
  billableHours: 0,
  description: '',
};

export function Page({ submit, afterSubmit, data: { loading, client } }) {
  return (
    <article>
      <Title>
        New time log for {client.name}
      </Title>
      <Form
        defaultValues={fields}
        validations={validations}
        submit={submit}
        afterSubmit={afterSubmit}
        theme={theme}>
        <Form.Field name="date" placeholder="0000-00-00" />
        <Form.Field name="startTime" label="startTime" placeholder="00:00" />
        <Form.Field name="endTime" label="End time" placeholder="00:00" />
        <Form.Field name="billableHours" />
        <Form.Field name="description" input="textarea" />
        <Form.Submit>Create</Form.Submit>
      </Form>
    </article>
  );
}

const MUTATION = gql`
  mutation CreateTimeLog($input: CreateTimeLogInput!) {
    response: createTimeLog(input: $input) {
      node {
        id
      }
      errors {
        field
        message
      }
    }
  }
`;

const QUERY = gql`
  query TimeLogNewPage($clientId: ID!) {
    client(id: $clientId) {
      id
      name
    }
  }
`;

export default compose(
  graphql(QUERY, {
    options: ({ params }) => ({ variables: { clientId: params.clientId } }),
  }),
  withPush,
  graphql(MUTATION, {
    props: ({ ownProps, mutate }) => ({
      async submit(input) {
        const { data: { response } } = await mutate({
          variables: {
            input: { ...input, clientId: ownProps.params.clientId },
          },
        });
        return response;
      },
      afterSubmit(node) {
        ownProps.push(paths.clients.show({ id: ownProps.params.clientId }));
      },
    }),
  }),
  withPage(),
)(Page);
