export default {
  dashboard() { return '/' },
  clients: {
    show({ id }) { return `/clients/${ id }`; },
    info({ id }) { return `/clients/${ id }/info`; },
    new() { return '/clients/new'; },
    edit({ id }) { return `/clients/${ id }/edit`; },
  },
  timeLogs: {
    new({ id }) { return `/clients/${ id }/time-logs/new`; },
    edit({ id }) { return `/time-logs/${ id }/edit`; },
  }
}
