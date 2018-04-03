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
  },
  getUserEnrollments(token) {
    return axios.get(BACK_HOST + '/api/enrollments/', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.data)
      .catch(error => {
        const user = new User()
        user.logout()
        Router.push('/')
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
    })
      .then(response => {
        if (response.status == 200) return response.data
        if (response.status == 422) {
          alert(response.data)
          return
        }
      }).catch((error) => {
        console.log(error)
        alert(error)
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
        const user = new User()
        user.logout()
        Router.push('/')
      })
  }
}

export default Services
