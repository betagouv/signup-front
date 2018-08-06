import jsonToFormData from './json-form-data'
import httpClient from './http-client'
const {REACT_APP_BACK_HOST: BACK_HOST, REACT_APP_FRANCE_CONNECT_ME_URI: FRANCE_CONNECT_ME_URI} = process.env

export function serializeEnrollment(enrollment) {
  return jsonToFormData({enrollment})
}

export function createOrUpdateUserEnrollment({enrollment}) {
  const serializedEnrollment = serializeEnrollment(enrollment)
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }

  if (enrollment.id) {
    return httpClient.patch(`${BACK_HOST}/api/enrollments/${enrollment.id}`, serializedEnrollment, config).then(({data}) => data)
  }

  return httpClient.post(`${BACK_HOST}/api/enrollments/`, serializedEnrollment, config).then(({data}) => data)
}

export function getUserEnrollment(id) {
  return httpClient.get(`${BACK_HOST}/api/enrollments/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(({data}) => data)
}

export function getUserEnrollments() {
  return httpClient.get(`${BACK_HOST}/api/enrollments/`, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(({data}) => data)
}

export function triggerUserEnrollment({action, id, message}) {
  const options = {
    event: action
  }

  if (message) {
    options.enrollment = {
      messages_attributes: [{content: message}]
    }
  }

  return httpClient.patch(`${BACK_HOST}/api/enrollments/${id}/trigger`, options, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function getResourceProviderService() {
  return httpClient.get(`${BACK_HOST}/api/resource_providers`).then(response => response.data)
}

export function getSirenInformation(siren) {
  return httpClient.get(`https://sirene.entreprise.api.gouv.fr/v1/siren/${siren}`)
    .then(({data: {
      siege_social: {nom_raison_sociale, nom, prenom, activite_principale, l2_normalisee, l3_normalisee, l4_normalisee, l5_normalisee, l6_normalisee, l7_normalisee}
    }}) => {
      const responsable = `${nom}  ${prenom}`
      const adresse = [l2_normalisee, l3_normalisee, l4_normalisee, l5_normalisee, l6_normalisee, l7_normalisee].filter(e => e).join(', ')

      return {nom_raison_sociale, adresse, responsable, activite_principale}
    })
}

export function getServiceProviders() {
  return httpClient.get(FRANCE_CONNECT_ME_URI).then(({data}) => data['service-providers'])
}
