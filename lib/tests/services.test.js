import {BACK_HOST} from '@env'
import Services from '../../lib/services'
import localStorage from '../../lib/tests/local-storage' // eslint-disable-line no-unused-vars
import FIRST_ENROLLMENT_1 from '../../mock/enrollment-form/first-form-enrollment'
import ENROLLMENTS from '../../mock/api/get-user-enrollments-response'
import RESOURCE_PROVIDERS from '../../mock/data/resource-providers'
import SENT_ENROLLMENT from '../../mock/enrollment-form/sent-enrollment'

const nock = require('nock')

describe('getUserEnrollments', () => {
  describe('When there is a response', () => {
    nock(BACK_HOST, {
      reqheaders: {
        Authorization: 'Bearer test',
        'Content-Type': 'application/json'
      }
    }).get('/api/enrollments/')
      .reply(200, ENROLLMENTS)
    it('should return the data', () => {
      const token = 'test'
      return Services.getUserEnrollments(token).then(response => {
        expect(response).toEqual(ENROLLMENTS)
      })
    })
  })
})

describe('getResourceProviderService', () => {
  describe('When the user is authorized', () => {
    nock(BACK_HOST).get('/api/resource_providers')
      .reply(200, RESOURCE_PROVIDERS, {'content-type': 'application/json'})

    it('should return a 200 code', () => {
      return Services.getResourceProviderService().then(response => {
        expect(response).toEqual(RESOURCE_PROVIDERS)
      })
    })
  })
})

describe('getUserEnrollment', () => {
  describe('When there is a response', () => {
    nock(BACK_HOST, {
      reqheaders: {
        Authorization: 'Bearer test',
        'Content-Type': 'application/json'
      }
    }).get('/api/enrollments/1')
      .reply(200, SENT_ENROLLMENT)
    it('should return a 200 status', () => {
      const token = 'test'
      return Services.getUserEnrollment(1, token).then(response => {
        expect(response).toEqual(SENT_ENROLLMENT)
      })
    })
  })
})

describe('serializeEnrollment', () => {
  describe('When there is a response', () => {
    it('should return a 200 status', () => {
      const enrollment = FIRST_ENROLLMENT_1
      expect([...Services.serializeEnrollment(enrollment)]).toEqual(
        [
          ['enrollment[enrollment][state]', 'pending'],
          ['enrollment[enrollment][fournisseur_de_service]', 'Nom du fournisseur de service'],
          ['enrollment[enrollment][description_service]', 'Description du service'],
          ['enrollment[enrollment][validation_de_convention]', 'true'],
          ['enrollment[enrollment][scope_dgfip_avis_imposition]', 'true'],
          ['enrollment[enrollment][scope_cnaf_attestation_droits]', 'true'],
          ['enrollment[enrollment][fournisseur_de_donnees]', 'api-particulier'],
          ['enrollment[enrollment][contacts][][id]', 'dpo'],
          ['enrollment[enrollment][contacts][][heading]', 'Délégué à la protection des données'],
          ['enrollment[enrollment][contacts][][nom]', 'Raphaël Dubigny'],
          ['enrollment[enrollment][contacts][][email]', 'rdubigny@gmail.com']
        ]
      )
    })
  })
})
