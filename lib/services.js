import {BACK_HOST} from '@env'
import httpAdapter from 'axios/lib/adapters/http'

const axios = require('axios')

axios.defaults.adapter = httpAdapter

const Services = {

  createUserEnrollment(state, token) {
    return axios.post(BACK_HOST + '/api/enrollments/', state, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response)
      .catch(error => {
        alert(JSON.stringify(error.response.data)) // eslint-disable-line no-alert
        return error.response
      })
  },
  updateUserEnrollment(state, token) {
    return axios.patch(BACK_HOST + '/api/enrollments/' + state.enrollment.id, state, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response)
      .catch(error => {
        alert(JSON.stringify(error.response.data)) // eslint-disable-line no-alert
        return error.response
      })
  },
  getUserEnrollment(id, token) {
    token = token || localStorage.getItem('token')
    return axios.get(BACK_HOST + '/api/enrollments/' + id, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.data)
      .catch(error => {
        alert(JSON.stringify(error.response.data)) // eslint-disable-line no-alert
        return error.response
      })
  },
  getUserEnrollments(token) {
    token = token || localStorage.getItem('token')
    return axios.get(BACK_HOST + '/api/enrollments/', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.data)
      .catch(error => {
        alert(JSON.stringify(error.response.data)) // eslint-disable-line no-alert
        throw error.response
      })
  },
  triggerUserEnrollment(action, enrollment) {
    // console.log('------- action -------- ', action)
    // console.log('------- enrollment.id -------- ', enrollment.id)
    const token = localStorage.getItem('token')
    // console.log('------- token -------- ', token)
    return axios.patch(BACK_HOST + '/api/enrollments/' + enrollment.id + '/trigger', {
      event: action,
      enrollment
    }, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    }).then(response => response)
      .catch(error => {
        alert(JSON.stringify(error.response.data)) // eslint-disable-line no-alert
        return error.response
      })
  },
  deleteUserEnrollment(token, id) {
    return axios.delete(BACK_HOST + '/api/enrollments/' + id, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response)
      .catch(error => {
        alert(JSON.stringify(error.response.data)) // eslint-disable-line no-alert
        return error.response
      })
  },
  getResourceProviderService() {
    return axios.get(BACK_HOST + '/api/resource_providers').then(response => response.data)
  }
}

export default Services
