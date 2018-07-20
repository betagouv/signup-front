import {BACK_HOST, FRANCE_CONNECT_ME_URI} from '@env'
import jsonToFormData from 'json-form-data'
import httpAdapter from 'axios/lib/adapters/http'

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
  createOrUpdateUserEnrollment({enrollment}) {
    const serializedEnrollment = this.serializeEnrollment(enrollment)
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'multipart/form-data'
      }
    }

    if (enrollment.id) {
      return axios.patch(`${BACK_HOST}/api/enrollments/${enrollment.id}`, serializedEnrollment, config).then(({data}) => data)
    }

    return axios.post(`${BACK_HOST}/api/enrollments/`, serializedEnrollment, config).then(({data}) => data)
  },
  getUserEnrollment(id, token) {
    token = token || localStorage.getItem('token')
    return axios.get(`${BACK_HOST}/api/enrollments/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
      .then(({data}) => data)
  },
  getUserEnrollments(token) {
    token = token || localStorage.getItem('token')
    return axios.get(`${BACK_HOST}/api/enrollments/`, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
      .then(({data}) => data)
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
    })
  },
  getResourceProviderService() {
    return axios.get(`${BACK_HOST}/api/resource_providers`).then(response => response.data)
  },
  getSirenInformation(siren) {
    return axios.get(`https://sirene.entreprise.api.gouv.fr/v1/siren/${siren}`)
      .then(({data: {
        siege_social: {nom_raison_sociale, nom, prenom, activite_principale, l2_normalisee, l3_normalisee, l4_normalisee, l5_normalisee, l6_normalisee, l7_normalisee}
      }}) => {
        const responsable = `${nom}  ${prenom}`
        const adresse = [l2_normalisee, l3_normalisee, l4_normalisee, l5_normalisee, l6_normalisee, l7_normalisee].filter(e => e).join(', ')

        return {nom_raison_sociale, adresse, responsable, activite_principale}
      })
  },
  getServiceProviders(token) {
    return axios.get(FRANCE_CONNECT_ME_URI, {
      headers: {Authorization: 'Bearer ' + token}
    }).then(response => {
      return response.data['service-providers']
    })
  }
}

export default Services
