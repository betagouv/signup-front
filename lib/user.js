import {OAUTH_ME_URI} from '@env'

const axios = require('axios')

class User {
  login(token) {
    token = token || localStorage.getItem('token') || ''
    localStorage.setItem('token', token)

    if (!token) {
      return Promise.reject()
    }
    return axios.get(OAUTH_ME_URI, {
      headers: {Authorization: 'Bearer ' + token}
    }).then(response => {
      Object.assign(this, response.data)
      return this
    }).catch(response => {
      localStorage.removeItem('token')
      return response
    })
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
    }
    return Promise.resolve(new User())
  }
}
export default User
