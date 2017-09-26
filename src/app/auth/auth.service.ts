import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { config } from '../config';

@Injectable()
export class AuthService {
  constructor (
    private http: HttpClient
  ) {
  }

  authorizationUrl () {
    // const res = config.oauth_url +
    //   '?client_id=' + config.clientId +
    //   '&response_type=token' +
    //   '&redirect_uri=' + config.oauthRedirectURI
    // const res = 'http://localhost:3000/users/auth/dgfip'
    const res = 'https://84.39.49.146/users/auth/dgfip'
    return encodeURI(res)
  }
}
