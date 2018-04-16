module.exports = {
  exportPathMap: () => {
    return {
      '/': {page: '/'},
      '/about': {page: '/about'},
      '/contact': {page: '/contact'},
      '/documentation': {page: '/documentation'},
      '/api-particulier': {page: '/api-particulier'},
      '/dgfip': {page: '/dgfip'}
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
