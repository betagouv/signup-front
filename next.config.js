const nextRuntimeDotenv = require('next-runtime-dotenv')

const withConfig = nextRuntimeDotenv({
  public: [
    'OAUTH_ME_URI',
    'OAUTH_CLIENT_ID',
    'OAUTH_HOST',
    'OAUTH_AUTHORIZE_URI',
    'OAUTH_REDIRECT_URI',
    'BACK_HOST',
    'FRANCE_CONNECT_AUTHORIZE_URI',
    'FRANCE_CONNECT_ME_URI',
    'API_ENTREPRISE_HOST',
    'PIWIK_URL',
    'PIWIK_SITE_ID'
  ]
})

module.exports = withConfig({
  exportPathMap: () => {
    return {
      '/': {page: '/'},
      '/about.html': {page: '/about.html'},
      '/contact.html': {page: '/contact.html'},
      '/api-particulier.html': {page: '/api-particulier.html'},
      '/dgfip.html': {page: '/dgfip.html'},
      '/api-entreprise.html': {page: '/api-entreprise.html'},
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
})
