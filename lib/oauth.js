const config = require('../lib/config')
const Client = require('client-oauth2')
import User from '../lib/user'

class OAuth {
  constructor () {
    this.client = new Client({
      clientId: config.apiParticulierOAuth.clientId,
      authorizationUri: config.apiParticulierOAuth.authorizeUri,
      redirectUri: config.apiParticulierOAuth.redirectUri,
      scopes: []
    })
  }

  authorize (uri) {
    return window.location.href = this.client.token.getUri()
  }
}

export default OAuth
