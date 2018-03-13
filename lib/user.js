import {OAUTH_ME_URI} from '@env'
import Router from 'next/router'

const axios = require('axios')

class User {
  constructor() {
    if (typeof localStorage !== 'undefined') {
      Object.assign(this, JSON.parse(localStorage.getItem('user')) || {})
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
    Router.push('/')
    return Promise.resolve(new User())
  }
}
export default User
