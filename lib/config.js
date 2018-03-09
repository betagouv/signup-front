import {CLIENT_ID, AUTHORIZE_URI, REDIRECT_URI, ME_URI, OAUTH_HOST} from '@env'

let config

if (process.env.NODE_ENV === 'production') {
  config = {
    apiParticulierOAuth: {
      authorizeUri: 'https://oauth.particulier.api.gouv.fr/oauth/authorize',
      clientId: '82546188522214c3577d35c283ce8842786649b35a026a9d44908037a597f29b',
      meUri: 'https://oauth.particulier.api.gouv.fr/api/v1/me',
      redirectUri: 'https://next.particulier.api.gouv.fr',
      host: 'https://oauth.particulier.api.gouv.fr'
    }
  }
} else {
  config = {
    apiParticulierOAuth: {
      authorizeUri: AUTHORIZE_URI,
      clientId: CLIENT_ID,
      meUri: ME_URI,
      redirectUri: REDIRECT_URI,
      host: OAUTH_HOST
    }
  }
}

const exports = config
export default exports
