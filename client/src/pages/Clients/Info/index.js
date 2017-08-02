import React from 'react';
import { graphql, gql, compose } from 'react-apollo';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router';

import paths from 'paths';
import Title from 'components/Title';
import withPage from 'utils/withPage';

export function Page({ data: { client } }) {
  return (
    <article>
      <Title>
        {client.name}
      </Title>

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

export default compose(
  graphql(QUERY, {
    options: ({ params }) => ({ variables: { id: params.id } }),
  }),
  withPage('client'),
)(Page);
