module.exports = {
  exportPathMap: () => {
    return {
      '/': {page: '/'},
      '/about.html': {page: '/about.html'},
      '/contact.html': {page: '/contact.html'},
      '/api-particulier.html': {page: '/api-particulier.html'},
      '/dgfip.html': {page: '/dgfip.html'},
      '/oauth-callback.html': {page: '/oauth-callback.html'}
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
