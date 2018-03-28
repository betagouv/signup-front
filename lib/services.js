import {BACK_HOST} from '@env'
import httpAdapter from 'axios/lib/adapters/http'

const axios = require('axios')

axios.defaults.adapter = httpAdapter

const Services = {

  postFormToBack(state, token) {
    return axios.post(BACK_HOST + '/api/enrollments/', state, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response)
      .catch(error => error.response)
  }
}

export default Services
