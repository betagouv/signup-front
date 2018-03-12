import {OAUTH_CLIENT_ID, OAUTH_AUTHORIZE_URI, OAUTH_REDIRECT_URI} from '@env'

const Client = require('client-oauth2')

class OAuth {
  constructor() {
    this.client = new Client({
      clientId: OAUTH_CLIENT_ID,
      authorizationUri: OAUTH_AUTHORIZE_URI,
      redirectUri: OAUTH_REDIRECT_URI,
      scopes: []
    })
  }

  authorize() {
    window.location.href = this.client.token.getUri()
  }
}

export default OAuth
