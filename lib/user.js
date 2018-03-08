const axios = require('axios')
const config = require('../lib/config')

class User {
  login(token) {
    token = token || localStorage.getItem('token')
    if (!token) {
      return Promise.reject()
    }
    return axios.get(config.apiParticulierOAuth.meUri, {
      headers: {Authorization: 'Bearer ' + token}
    }).then(response => {
      Object.assign(this, response.data)
      return this
    })
  }
}
export default User
