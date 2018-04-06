import {OAUTH_ME_URI, FRANCE_CONNECT_ME_URI} from '@env'
import Utils from '../lib/utils'

const axios = require('axios')

class User {
  constructor() {
    if (typeof localStorage !== 'undefined') {
      Object.assign(this, JSON.parse(localStorage.getItem('user')) || {})
    }

    if (typeof window !== 'undefined') {
      if (!this.loggedIn) {
        const token = Utils.extractTokenFromUrl(window.location.toString())
        this.login(token).then(user => {
          Object.assign(this, user)
        })
      }
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

    if (this.loggedIn) {
      return Promise.resolve(this)
    }

    return axios.get(OAUTH_ME_URI, {
      headers: {Authorization: 'Bearer ' + token}
    }).then(response => {
      Object.assign(this, response.data)
      this.loggedIn = true
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(this))
        location.reload()
      }

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

  getServiceProviders() {
    const token = localStorage.getItem('token-fc')
    return axios.get('https://partenaires.dev.dev-franceconnect.fr/oauth/v1/userinfo', {
      headers: {Authorization: 'Bearer ' + token}
    }).then(response => {
      return response.data['service-providers']
    })
  }
}
export default User
