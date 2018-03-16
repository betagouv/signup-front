import {BACK_HOST} from '@env'

const axios = require('axios')

const Services = {

  postFormToBack(state) {
    console.log('-------- in post api')
    return axios.post(BACK_HOST + '/api/enrollments/', {
      headers: {
        Authorization: 'Bearer france_connect',
        'Content-Type': 'application/json'
      },
      body: state
    })
      .then(response => console.log('---------  response '))
      .catch(error => console.log('--------- error'))
  }
}

export default Services
