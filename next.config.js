module.exports = {
  exportPathMap: () => {
    return {
      '/': {page: '/'},
      '/about': {page: '/about'},
      '/demandes': {page: '/demandes'},
      '/entrants-techniques': {page: '/entrants-techniques'},
      '/contact': {page: '/contact'},
      '/documentation': {page: '/documentation'},
      '/contractualisation': {page: '/contractualisation'}
    }
  },
  webpackDevMiddleware: config => {
    config.watchOptions = {
      // Check for changes every second
      poll: 1000,

      // Delay before rebuilding
      aggregateTimeout: 300
    }

    return config
  }
}
