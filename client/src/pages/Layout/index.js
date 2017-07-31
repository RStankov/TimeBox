import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Menu, Grid, Button, Icon, Loader } from 'semantic-ui-react';
import { Link } from 'react-router';
import { graphql, gql } from 'react-apollo';

import paths from 'paths';

export function Layout({ children, data: { loading, allClients } }) {
  if (loading) {
    return <Loader active inline="centered" />;
  }

  return (
    <Container fluid={false}>
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={3}>
            <Menu fluid vertical size="massive">
              <Menu.Item header>
                <Menu.Header>
                  <Button
                    circular
                    basic
                    compact
                    icon
                    size="mini"
                    floated="right"
                    style={{ position: 'relative', top: -5, right: -5 }}>
                    <Link to={paths.newClient()}>
                      <Icon name="add" style={{ margin: 0 }} />
                    </Link>
                  </Button>
                  Clients
                </Menu.Header>
                <Menu.Menu>
                  {allClients.map(client =>
                    <Menu.Item active={true} key={client.id}>
                      <Link to={paths.client(client)}>
                        {client.name}
                      </Link>
                    </Menu.Item>,
                  )}
                </Menu.Menu>
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column stretched width={12}>
            {children}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

const QUERY = gql`
  query Layout {
    allClients {
      id
      name
    }
  }
`;

export default graphql(QUERY)(Layout);
