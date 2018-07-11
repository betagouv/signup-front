import jsonToFormData from 'json-form-data'
import httpAdapter from 'axios/lib/adapters/http'

const {BACK_HOST} = process.env

const axios = require('axios')

axios.defaults.adapter = httpAdapter

const Services = {
  serializeEnrollment(enrollment) {
    const formDataWithIndices = jsonToFormData({enrollment})
    // Rails do not respect the standard https://darobin.github.io/formic/specs/json/
    // we need to remove indices for arrays
    const formDataWithoutIndices = new FormData()
    formDataWithIndices.forEach((value, key) => {
      const keyWithoutIndex = key.replace(/\d+/, '')
      formDataWithoutIndices.append(keyWithoutIndex, value)
    })
    return formDataWithoutIndices
  },
  createUserEnrollment(enrollment) {
    const serializedEnrollment = this.serializeEnrollment(enrollment)
    return axios.post(`${BACK_HOST}/api/enrollments/`, serializedEnrollment, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  updateUserEnrollment(enrollment) {
    const serializedEnrollment = this.serializeEnrollment(enrollment)
    return axios.patch(`${BACK_HOST}/api/enrollments/${enrollment.id}`, serializedEnrollment, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => response)
  },
  getUserEnrollment(id, token) {
    token = token || localStorage.getItem('token')
    return axios.get(`${BACK_HOST}/api/enrollments/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.data)
  },
  getUserEnrollments(token) {
    token = token || localStorage.getItem('token')
    return axios.get(`${BACK_HOST}/api/enrollments/`, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.data)
  },
  triggerUserEnrollment(action, enrollment) {
    const token = localStorage.getItem('token')
    return axios.patch(`${BACK_HOST}/api/enrollments/${enrollment.id}/trigger`, {
      event: action,
      enrollment
    }, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    }).then(response => response)
  },
  getResourceProviderService() {
    return axios.get(`${BACK_HOST}/api/resource_providers`).then(response => response.data)
  },
  getSirenInformation(siren) {
    return axios.get(`https://sirene.entreprise.api.gouv.fr/v1/siren/${siren}`)
  }
}

export default Services
