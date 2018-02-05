import { Injectable, ApplicationRef } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Enrollment } from '../enrollment/enrollment'
import { config } from '../config'

function camelCaseKeys (o) {
  if (!((typeof o) === 'object')) return o
  if (Array.isArray(o)) {
    return o.map((e) => camelCaseKeys(e))
  }
  let res;
  for (let k in o) {
    res = res || {}
    res[k.replace(/(_\w)/g, (letter) => letter[1].toUpperCase())] = camelCaseKeys(o[k])
  }
  return res
}

@Injectable()
export class UserService {
  user: string;
  token: string;
  loggedIn: boolean;
  error: any;

  constructor (
    private http: HttpClient,
    private application: ApplicationRef
  ) { }

  login (token) {
    localStorage.setItem('token', token)
    if (localStorage.getItem('authType') == 'franceConnect') {
      // return this.http.get(config.franceConnectUrl + '/oauth/v1/userinfo').toPromise().then((response) => {
      return Promise.resolve({user: { email: 'fc@france_connect.user'}}).then((response) => {
        this.user = response['user']['email']
        this.loggedIn = true
        this.error = null
        return response
      })
    }
    if (localStorage.getItem('authType') == 'resourceProvider') {
      return this.http.get(config.oauth_me_url).toPromise().then((response) => {
        this.user = response['email']
        this.loggedIn = true
        this.error = null
        return response
      })
    }
  }

  isLoggedIn() {
    return this.loggedIn
  }

  logout () {
    return this.http.post(config.oauth_revoke_url, null).map((response) => {
      localStorage.removeItem('token')
      this.loggedIn = false
      this.application.tick()
      return !(this.loggedIn)
    }).toPromise()
  }

  getServiceProviders () {
    // return this.http.get(config.franceConnectUrl + '/oauth/v1/userinfo').toPromise().then((response) => {
    return Promise.resolve({'service-providers': [{name: 'démarche 1'},  {name: 'démarche 2'}]}).then((response) => {
      console.log(response)
      return {
        data: response['service-providers']
      }
    })
    // return Promise.resolve({
    //   data: [
    //     { name: 'démarche 1' },
    //     { name: 'démarche 2' },
    //     { name: 'démarche 3' }
    //   ]
    // })
  }

  getToken () {
    return this.token
  }

  getEnrollments () {
    return this.http.get(config.api_url + '/enrollments').map((response) => {
      return response['map']((data) => new Enrollment(camelCaseKeys(data)))
    }).toPromise()
  }

  authType () {
    return localStorage.getItem('authType')
  }
}
