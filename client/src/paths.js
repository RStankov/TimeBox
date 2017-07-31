export default {
  dashboard() { return '/' },
  client({ id }) { return `/clients/${ id }`; },
  newClient() { return '/clients/new'; },
}
