
import config from '../lib/config'

const Client = require('client-oauth2')

class OAuth {
  constructor() {
    this.client = new Client({
      clientId: config.apiParticulierOAuth.clientId,
      authorizationUri: config.apiParticulierOAuth.authorizeUri,
      redirectUri: config.apiParticulierOAuth.redirectUri,
      scopes: []
    })
  }

  authorize() {
    window.location.href = this.client.token.getUri()
  }
}

export default OAuth
