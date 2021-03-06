import React from 'react';
import { graphql, gql, compose } from 'react-apollo';
import _ from 'lodash';
import { Link } from 'react-router';

import { Form } from 'components/Form';
import theme from 'utils/formTheme';
import validations from 'utils/timeLogValidations';
import paths from 'paths';
import DeleteButton from './DeleteButton';
import Title from 'components/Title'
import withPush from 'utils/withPush';
import withPage from 'utils/withPage';

export function Page({ submit, afterSubmit, data: { timeLog } }) {
  const fields = _.pick(timeLog, [
    'date',
    'startTime',
    'endTime',
    'billableHours',
    'description',
  ]);

  return (
    <article>
      <Title>
        Edit time log for {timeLog.client.name}
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
        <Form.Submit>Update</Form.Submit>&nbsp;or&nbsp;
        <Link to={paths.clients.show(timeLog.client)}>Cancel</Link>
      </Form>
      <hr />
      <p>
        <DeleteButton timeLog={timeLog} />
      </p>
    </article>
  );
}

const FRAGMENT = gql`
  fragment TimeLogsEditForm on TimeLog {
    id
    date
    startTime
    endTime
    billableHours
    description
  }
`;

const MUTATION = gql`
  mutation UpdateTimeLog($input: UpdateTimeLogInput!) {
    response: updateTimeLog(input: $input) {
      node {
        id
        ...TimeLogsEditForm
      }
      errors {
        field
        message
      }
    }
  }
  ${FRAGMENT}
`;

const QUERY = gql`
  query TimeLogEditPage($id: ID!) {
    timeLog(id: $id) {
      id
      ...TimeLogsEditForm
      client {
        id
        name
      }
    }
  }
  ${FRAGMENT}
`;

export default compose(
  withPush,
  graphql(QUERY, {
    options: ({ params }) => ({ variables: { id: params.id } }),
  }),
  withPage('timeLog'),
  graphql(MUTATION, {
    props: ({ ownProps, mutate }) => ({
      async submit(input) {
        const { data: { response } } = await mutate({
          variables: { input: { ...input, id: ownProps.params.id } },
        });
        return response;
      },
      afterSubmit(node) {
        ownProps.push(paths.clients.show(ownProps.data.timeLog.client));
      },
    }),
  }),
)(Page);
