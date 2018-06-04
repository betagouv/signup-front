module.exports = {
  exportPathMap: () => {
    return {
      '/': {page: '/'},
      '/about.html': {page: '/about.html'},
      '/contact.html': {page: '/contact.html'},
      '/api-particulier.html': {page: '/api-particulier.html'},
      '/dgfip.html': {page: '/dgfip.html'},
      '/api-entreprise.html': {page: '/api-entreprise.html'},
      '/oauth-callback': {page: '/oauth-callback'}
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
