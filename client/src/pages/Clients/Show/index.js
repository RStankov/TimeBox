import React from 'react';
import { graphql, gql, compose } from 'react-apollo';
import { Menu, Button, Icon, Table } from 'semantic-ui-react';
import { Link } from 'react-router';

import paths from 'paths';
import Title from 'components/Title';
import withPage from 'utils/withPage';

export function Page({ data: { loading, client } }) {
  const sum = client.timeLogs.reduce(
    (acc, { billableHours }) => acc + billableHours,
    0,
  );

  return (
    <article>
      <Title>
        {client.name}
      </Title>

      <Menu>
        <Menu.Item active={true}>
          <Link to={paths.clients.show(client)}>Time Logs</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={paths.clients.info(client)}>Info</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={paths.clients.edit(client)}>Edit</Link>
        </Menu.Item>
      </Menu>

      {!client.timeLogs.length &&
        <center>
          <Link to={paths.timeLogs.new(client)}>Add the first time log</Link>
        </center>}
      {!!client.timeLogs.length &&
        <Table celled compact>
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Period</Table.HeaderCell>
              <Table.HeaderCell>Billable Time</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>
                <Link to={paths.timeLogs.new(client)}>Add</Link>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {client.timeLogs.map(timeLog =>
              <Table.Row key={timeLog.id}>
                <Table.Cell>
                  {timeLog.date}
                </Table.Cell>
                <Table.Cell>
                  {timeLog.startTime}-{timeLog.endTime}
                </Table.Cell>
                <Table.Cell textAlign="right">
                  {timeLog.billableHours}
                </Table.Cell>
                <Table.Cell>
                  {timeLog.description}
                </Table.Cell>
                <Table.Cell>
                  <Button icon size="small">
                    <Link to={paths.timeLogs.edit(timeLog)}>
                      <Icon name="edit" />
                    </Link>
                  </Button>
                </Table.Cell>
              </Table.Row>,
            )}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="2" />
              <Table.HeaderCell textAlign="right">
                {sum} (${sum * client.hourlyRate})
              </Table.HeaderCell>
              <Table.HeaderCell colSpan="2" />
            </Table.Row>
          </Table.Footer>
        </Table>}
    </article>
  );
}

const QUERY = gql`
  query ClientsShowPage($id: ID!) {
    client(id: $id) {
      id
      name
      hourlyRate
      timeLogs {
        id
        date
        startTime
        endTime
        description
        billableHours
      }
    }
  }
`;

export default compose(
  graphql(QUERY, {
    options: ({ params }) => ({
      variables: { id: params.id },
      fetchPolicy: 'network-only',
    }),
  }),
  withPage('client'),
)(Page);
