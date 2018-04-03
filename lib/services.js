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
      .catch(error => {
        const user = new User()
        user.logout()
        Router.push('/')
      })
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
