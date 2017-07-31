import React from 'react';
import { graphql, gql } from 'react-apollo';
import {
  Header,
  Loader,
  Menu,
  Button,
  Icon,
  Table,
} from 'semantic-ui-react';

export function Page({ data: { loading, client } }) {
  if (loading) {
    return <Loader active inline="centered" />;
  }

  return (
    <article>
      <Header as="h1">
        {client.name}
      </Header>

      <Menu>
        <Menu.Item name="Time Logs" active={true} />
        <Menu.Item name="Invoices" />
        <Menu.Item name="Information" />
        <Menu.Item name="Edit" />
      </Menu>

      <Table celled compact>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Period</Table.HeaderCell>
            <Table.HeaderCell>Billable Time</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>
              <Button icon primary size="small">
                <Icon name="add" />
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>2017/07/10</Table.Cell>
            <Table.Cell>11:00-12:20</Table.Cell>
            <Table.Cell textAlign="right">2</Table.Cell>
            <Table.Cell>Meeting</Table.Cell>
            <Table.Cell>
              <Button icon size="small">
                <Icon name="edit" />
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="2" />
            <Table.HeaderCell textAlign="right">2 ( $120 )</Table.HeaderCell>
            <Table.HeaderCell colSpan="2" />
          </Table.Row>
        </Table.Footer>
      </Table>
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
