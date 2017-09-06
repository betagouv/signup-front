import { Injectable } from '@angular/core'

Injectable()
export class UserService {
  user: string;
  password: string;
  token: string;

  constructor () {}

  login () {
    if (this.user == 'octo' && this.password == 'octo') {
      return Promise.resolve({
        access_token: '12345'
      }).then((response) => {
        this.token = response.access_token
        return response
      })
    } else {
      return Promise.reject({
        errors: [
          {
            detail: 'utilisateur et/ou mot de passe incorrect'
          }
        ]
      })
    }
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
}
