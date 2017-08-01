import React from 'react';
import { graphql, gql } from 'react-apollo';
import {
  Header,
  Loader,
  Menu,
} from 'semantic-ui-react';
import { Link } from 'react-router';

import paths from 'paths';

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
        <Menu.Item>
          <Link to={paths.clients.show(client)}>Time Logs</Link>
        </Menu.Item>
        <Menu.Item active={true}>
          <Link to={paths.clients.info(client)}>Info</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={paths.clients.edit(client)}>Edit</Link>
        </Menu.Item>
      </Menu>

      <div>
        <strong>hourlyRate:</strong> {client.hourlyRate}
      </div>

      <div>
        <strong>notes:</strong>
        <pre>
          {client.notes}
        </pre>
      </div>
    </article>
  );
}

const QUERY = gql`
  query ClientsInfoPage($id: ID!) {
    client(id: $id) {
      id
      name
      hourlyRate
      notes
    }
  }
`;

export default graphql(QUERY, {
  options: ({ params }) => ({ variables: { id: params.id } }),
})(Page);
