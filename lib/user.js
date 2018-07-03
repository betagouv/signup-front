import {OAUTH_ME_URI} from '@env'
import Utils from '../lib/utils'

const axios = require('axios')

class User {
  constructor() {
    if (typeof window !== 'undefined') {
      const token = Utils.extractTokenFromUrl(window.location.toString())
      this.login(token).then(user => {
        Object.assign(this, user)
      })
    }
  }

  login(token) {
    if (typeof localStorage !== 'undefined') {
      token = token || localStorage.getItem('token') || ''
      localStorage.setItem('token', token)
    }

    if (!token) {
      return Promise.resolve(this)
    }

    return axios.get(OAUTH_ME_URI, {
      headers: {Authorization: 'Bearer ' + token}
    }).then(response => {
      Object.assign(this, response.data)
      this.loggedIn = true

      return this
    }).catch(response => {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }

      return response
    })
  }

  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
    return Promise.resolve(new User())
  }

  getServiceProviders(token) {
    if (!token) {
      return Promise.reject(new Error('Token not provided'))
    }
    return axios.get('https://partenaires.dev.dev-franceconnect.fr/oauth/v1/userinfo', {
      headers: {Authorization: 'Bearer ' + token}
    }).then(response => {
      return response.data['service-providers']
    })
  }
}
export default User
