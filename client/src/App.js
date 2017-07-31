import React from 'react';
import { graphql, gql } from 'react-apollo';

export function App({ data: { allClients, allTimeLogs } }) {
  return (
    <main>
      <h1>Data</h1>
      <section>
        <h2>Clients</h2>
        <pre>
          {JSON.stringify(allClients)}
        </pre>
      </section>
      <section>
        <h2>TimeLogs</h2>
        <pre>
          {JSON.stringify(allTimeLogs)}
        </pre>
      </section>
    </main>
  );
}

const QUERY = gql`
  query HomePage {
    allClients {
      id
      name
    }
    allTimeLogs {
      id
      description
    }
  }
`;

export default graphql(QUERY)(App);
