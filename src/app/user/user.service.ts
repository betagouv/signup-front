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
  password: string;
  token: string;
  loggedIn: boolean;
  error: any;

  constructor (
    private http: HttpClient,
    private application: ApplicationRef
  ) { }

  login (token) {
    localStorage.setItem('token', token)
    // return this.http.get(config.oauth_me_url).toPromise().then((response) => {
    return Promise.resolve({email: token}).then((response) => {
    this.user = response['email']
      this.loggedIn = true
      this.error = null
      return response
    })
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
    return Promise.resolve({
      data: [
        { name: 'service 1' },
        { name: 'service 2' }
      ]
    })
  }

  getToken () {
    return this.token
  }

  getEnrollments () {
    return this.http.get(config.api_url + '/enrollments').map((response) => {
      return response['map']((data) => new Enrollment(camelCaseKeys(data)))
    }).toPromise()
  }
}
