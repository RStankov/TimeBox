import update from 'immutability-helper';
import _ from 'lodash';

update.extend(
  '$pushConnection',
  ({ edges, pageInfo, __typename }, connection) => {
    return {
      __typename,
      pageInfo,
      edges: [].concat(connection.edges, edges),
    };
  },
);

update.extend(
  '$replaceConnection',
  ({ edges, pageInfo, __typename }, connection) => {
    return {
      __typename,
      pageInfo,
      edges,
    };
  },
);

update.extend('$appendNode', (node, { edges, pageInfo, __typename }) => {
  return {
    __typename,
    pageInfo,
    edges: [].concat(edges, [{ node, __typename: `${node.__typename}Edge` }]),
  };
});

update.extend('$removeNode', (node, { edges, pageInfo, __typename }) => {
  return {
    __typename,
    pageInfo,
    edges: edges.filter(({ node: { id } }) => node.id !== id),
  };
});

update.extend('$unsetById', (node, array) => {
  return array.filter(({ id }) => id !== node.id);
});

export { update };

export function addToCollection(path) {
  return (previousResult, { mutationResult }) => {
    const changes = {}
    const last = _.toPath(path).reduce((a, b) => {
      a[b] = {};
      return a[b];
    }, changes);

    // TODO(rstankov): Don't expect name to be response
    last['$push'] = [mutationResult.data.response.node];

    return update(previousResult, changes);
  };
}

export function removeFromCollection(path, node) {
  return (previousResult, { mutationResult }) => {
    const changes = {}
    const last = _.toPath(path).reduce((a, b) => {
      a[b] = {};
      return a[b];
    }, changes);

    last['$unsetById'] = node;

    return update(previousResult, changes);
  };
}

export function extractEdgeNodes(data) {
  if (!data || !data.edges) {
    return [];
  }

  return data.edges.map(({ node }) => node);
}

export function countEdgeNodes(data) {
  if (!data || !data.edges) {
    return 0;
  }

  return data.edges.length;
}

export function areEdgeNodesEmpty(data: any) {
  return countEdgeNodes(data) === 0;
}

export function hasAnyEdgeNodes(data: any) {
  return countEdgeNodes(data) > 0;
}

export function hasNextPage(data) {
  return data.pageInfo.hasNextPage;
}

export function isNodeInEdge(connection, node) {
  return !!(connection.edges || []).find(({ node: { id } }) => id === node.id);
}
