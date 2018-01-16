import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { config } from '../config';

@Injectable()
export class AuthService {
  constructor (
    private http: HttpClient
  ) {
  }

  franceConnectLogin () {
    localStorage.setItem('authType', 'franceConnect')
    window.location.href = this.franceConnectAuthorizationUrl()
  }

  resourceProviderLogin () {
    localStorage.setItem('authType', 'resourceProvider')
    window.location.href = this.resourceProviderAuthorizationUrl()
  }

  franceConnectAuthorizationUrl () {
    // const res = config.oauth_url +
    //   '?client_id=' + config.clientId +
    //   '&response_type=token' +
    //   '&redirect_uri=' + config.oauthRedirectURI
    // const res = 'http://localhost:3000/users/auth/dgfip'
    const res = 'http://localhost:3000/users/auth/france_connect'
    return encodeURI(res)
  }

  resourceProviderAuthorizationUrl () {
    // const res = config.oauth_url +
    //   '?client_id=' + config.clientId +
    //   '&response_type=token' +
    //   '&redirect_uri=' + config.oauthRedirectURI
    // const res = 'http://localhost:3000/users/auth/dgfip'
    const res = 'http://localhost:3000/users/auth/resource_provider'
    return encodeURI(res)
  }
}
