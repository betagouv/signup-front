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

  serviceProviderLogin () {
    localStorage.setItem('authType', 'serviceProvider')
    window.location.href = this.serviceProviderAuthorizationUrl()
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

  dgfipAuthorizationUrl () {
    // const res = config.oauth_url +
    //   '?client_id=' + config.clientId +
    //   '&response_type=token' +
    //   '&redirect_uri=' + config.oauthRedirectURI
    // const res = 'http://localhost:3000/users/auth/dgfip'
    const res = 'http://localhost:3000/users/auth/dgfip'
    return encodeURI(res)
  }
  serviceProviderAuthorizationUrl () {
    // const res = config.oauth_url +
    //   '?client_id=' + config.clientId +
    //   '&response_type=token' +
    //   '&redirect_uri=' + config.oauthRedirectURI
    // const res = 'http://localhost:3000/users/auth/dgfip'
    const res = 'http://localhost:3000/users/auth/service_provider'
    return encodeURI(res)
  }
}
