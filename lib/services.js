import {BACK_HOST} from '@env'
import httpAdapter from 'axios/lib/adapters/http'
import Router from 'next/router'
import User from './user'

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
      .catch((error) => {
        alert(JSON.stringify(error.response.data))
        return error.response
      })

  },
  updateUserEnrollment(enrollment, token) {
    return axios.patch(BACK_HOST + '/api/enrollments/' + enrollment.id, {enrollment}, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => console.log(response))
      .catch((error) => {
        alert(JSON.stringify(error.response.data))
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
      .catch((error) => {
        alert(JSON.stringify(error.response.data))
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
      .catch((error) => {
        alert(JSON.stringify(error.response.data))
        return error.response
      })
  },
  triggerUserEnrollment(action, enrollment) {
    const token = localStorage.getItem('token')
    return axios.patch(BACK_HOST + '/api/enrollments/' + enrollment.id + '/trigger', {
      event: action,
      enrollment
    }, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    }).then(response => {
        return response
      }).catch((error) => {
        alert(JSON.stringify(error.response.data))
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
      .catch((error) => {
        alert(JSON.stringify(error.response.data))
        return error.response
      })
  }
}

export default Services
