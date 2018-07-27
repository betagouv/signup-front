import {OAUTH_CLIENT_ID, OAUTH_AUTHORIZE_URI, OAUTH_REDIRECT_URI} from '@env'
import Client from 'client-oauth2'

class OAuthClient {
  constructor() {
    this.client = new Client({
      clientId: OAUTH_CLIENT_ID,
      authorizationUri: OAUTH_AUTHORIZE_URI,
      redirectUri: OAUTH_REDIRECT_URI,
      scopes: []
    })
  }

  getAuthorizationUri = () => this.client.token.getUri()
}

export default OAuthClient
