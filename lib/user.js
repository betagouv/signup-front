const axios = require('axios')
const config = require('../lib/config')

class User {
  constructor () { }

  login (token) {
    token = token || localStorage.getItem('token')
    if (!token) return Promise.resolve()
    return axios.get(config.apiParticulierOAuth.meUri, {
      headers: { 'Authorization': 'Bearer ' + token}
    }).then((response) => {
      Object.assign(this, response.data)
      return this
    })
  }
}
export default User
