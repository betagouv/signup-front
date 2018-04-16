import {BACK_HOST} from '@env'
import Services from '../../lib/services'
import localStorage from '../../lib/tests/local-storage' // eslint-disable-line no-unused-vars
import FIRST_ENROLLMENT_1 from '../../mock/enrollment-form/first-form-enrollment'
import ENROLLMENTS from '../../mock/api/get-user-enrollments-response'
import RESOURCE_PROVIDERS from '../../mock/data/resource-providers'
import PENDING_ENROLLMENT from '../../mock/enrollment-form/pending-enrollment'
import VALIDATED_ENROLLMENT from '../../mock/enrollment-form/validated-enrollment'
import SENT_ENROLLMENT from '../../mock/enrollment-form/sent-enrollment'
import TECHNICAL_INPUTS_ENROLLMENT from '../../mock/enrollment-form/technical-inputs-enrollment'
import USER_SEND_APPLICATION_RESPONSE from '../../mock/api/trigger-send-application-response'
import RESOURCE_PROVIDER_VALIDATE_RESPONSE from '../../mock/api/trigger-validate-application-response'
import RESOURCE_PROVIDER_REFUSE_RESPONSE from '../../mock/api/trigger-refuse-application-response'
import RESOURCE_PROVIDER_REVIEW_RESPONSE from '../../mock/api/trigger-review-application-response'
import RESOURCE_PROVIDER_DEPLOYED_RESPONSE from '../../mock/api/trigger-deployed-application-response'
import RESOURCE_PROVIDER_TECHNICAL_INPUTS_RESPONSE from '../../mock/api/trigger-technical-inputs-application-response'

const nock = require('nock')

describe('createUserEnrollment', () => {
  describe('When the user is not authorized', () => {
    nock(BACK_HOST, {
      reqheaders: {
        Authorization: 'Bearer boom',
        'Content-Type': 'application/json'
      }
    }).post('/api/enrollments/', FIRST_ENROLLMENT_1)
      .reply(401, {})

    it('should return a 401', () => {
      const state = FIRST_ENROLLMENT_1
      const token = 'boom'
      return Services.createUserEnrollment(state, token).then(response => {
        expect(response.status).toBe(401)
      })
    })
  })
  describe('When the user is authorized', () => {
    describe('When the paylod is no empty', () => {
      nock(BACK_HOST, {
        reqheaders: {
          Authorization: 'Bearer test',
          'Content-Type': 'application/json'
        }
      }).post('/api/enrollments/', FIRST_ENROLLMENT_1)
        .reply(201, {})
      it('should return a 201 code', () => {
        const state = FIRST_ENROLLMENT_1
        const token = 'test'
        return Services.createUserEnrollment(state, token).then(response => {
          expect(response.status).toBe(201)
        })
      })
    })
  })
})

describe('updateUserEnrollment', () => {
  describe('When there is a response', () => {
    nock(BACK_HOST, {
      reqheaders: {
        Authorization: 'Bearer test',
        'Content-Type': 'application/json'
      }
    }).patch('/api/enrollments/1', PENDING_ENROLLMENT)
      .reply(200, VALIDATED_ENROLLMENT)
    it('should return the data', () => {
      const token = 'test'
      const id = 1
      return Services.updateUserEnrollment(PENDING_ENROLLMENT, token, id).then(response => {
        expect(response.data).toEqual(VALIDATED_ENROLLMENT)
      })
    })
  })
  describe('When there is an error', () => {})
})

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
  describe.skip('When there is an error', () => {})
})

describe('deleteUserEnrollment', () => {
  describe('When there is a response', () => {
    nock(BACK_HOST, {
      reqheaders: {
        Authorization: 'Bearer test',
        'Content-Type': 'application/json'
      }
    }).delete('/api/enrollments/1')
      .reply(204)
    it('should return a 204 status', () => {
      const token = 'test'
      return Services.deleteUserEnrollment(token, 1).then(response => {
        expect(response.status).toEqual(204)
      })
    })
  })
  describe('When there is an error', () => {})
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
  describe.skip('When there is an error', () => {})
})

describe('triggerUserEnrollment', () => {
  // Voir les règles métiers sur  api-particulier-courtier-docker/back/app/policies/enrollment_policy.rb et back/app/models/enrollment.rb
  describe('When applicant is connected', () => {
    beforeEach(() => {
      localStorage.setItem('token', 'fake Applicant Token')
    })
    afterEach(() => {
      localStorage.removeItem('token')
    })
    it('should return a sent state when event action is send_application and previous state is pending', () => {
      const action = 'send_application'
      const payload = {
        event: action,
        enrollment: PENDING_ENROLLMENT
      }
      nock(BACK_HOST, {
        reqheaders: {
          Authorization: 'Bearer fake Applicant Token',
          'Content-Type': 'application/json'
        }
      }).patch('/api/enrollments/1/trigger', payload)
        .reply(200, USER_SEND_APPLICATION_RESPONSE)

      return Services.triggerUserEnrollment(action, PENDING_ENROLLMENT).then(response => {
        expect(response.data.state).toEqual('sent')
      })
    })
    it('should return a technical_inputs state when event action is send_technical_inputs and previous state is validated', () => {
      const action = 'send_technical_inputs'
      const payload = {
        event: action,
        enrollment: VALIDATED_ENROLLMENT
      }
      nock(BACK_HOST, {
        reqheaders: {
          Authorization: 'Bearer fake Applicant Token',
          'Content-Type': 'application/json'
        }
      }).patch('/api/enrollments/1/trigger', payload)
        .reply(200, RESOURCE_PROVIDER_TECHNICAL_INPUTS_RESPONSE)

      return Services.triggerUserEnrollment(action, VALIDATED_ENROLLMENT).then(response => {
        expect(response.data.state).toEqual('technical_inputs')
      })
    })
  })
  describe('When resource provider is connected', () => {
    beforeEach(() => {
      localStorage.setItem('token', 'fake Resource Provider Token')
    })
    afterEach(() => {
      localStorage.removeItem('token')
    })
    it('should return a validated state when event action is validate_application and previous state is sent', () => {
      const action = 'validate_application'
      const payload = {
        event: action,
        enrollment: SENT_ENROLLMENT
      }
      nock(BACK_HOST, {
        reqheaders: {
          Authorization: 'Bearer fake Resource Provider Token',
          'Content-Type': 'application/json'
        }
      }).patch('/api/enrollments/1/trigger', payload)
        .reply(200, RESOURCE_PROVIDER_VALIDATE_RESPONSE)

      return Services.triggerUserEnrollment(action, SENT_ENROLLMENT).then(response => {
        expect(response.data.state).toEqual('validated')
      })
    })

    it('should return a refused state when event action is refuse_application and previous state is sent', () => {
      const action = 'refuse_application'
      const payload = {
        event: action,
        enrollment: SENT_ENROLLMENT
      }
      nock(BACK_HOST, {
        reqheaders: {
          Authorization: 'Bearer fake Resource Provider Token',
          'Content-Type': 'application/json'
        }
      }).patch('/api/enrollments/1/trigger', payload)
        .reply(200, RESOURCE_PROVIDER_REFUSE_RESPONSE)

      return Services.triggerUserEnrollment(action, SENT_ENROLLMENT).then(response => {
        expect(response.data.state).toEqual('refused')
      })
    })

    it('should return a pending state when event action is review_application and previous state is sent', () => {
      const action = 'validate_application'
      const payload = {
        event: action,
        enrollment: SENT_ENROLLMENT
      }
      nock(BACK_HOST, {
        reqheaders: {
          Authorization: 'Bearer fake Resource Provider Token',
          'Content-Type': 'application/json'
        }
      }).patch('/api/enrollments/1/trigger', payload)
        .reply(200, RESOURCE_PROVIDER_REVIEW_RESPONSE)

      return Services.triggerUserEnrollment(action, SENT_ENROLLMENT).then(response => {
        expect(response.data.state).toEqual('pending')
      })
    })
    it('should return a deployed state when event action is deploy_application and previous state is validated and XXXX', () => {
      const action = 'deploy_application'
      const payload = {
        event: action,
        enrollment: TECHNICAL_INPUTS_ENROLLMENT
      }
      nock(BACK_HOST, {
        reqheaders: {
          Authorization: 'Bearer fake Resource Provider Token',
          'Content-Type': 'application/json'
        }
      }).patch('/api/enrollments/1/trigger', payload)
        .reply(200, RESOURCE_PROVIDER_DEPLOYED_RESPONSE)

      return Services.triggerUserEnrollment(action, TECHNICAL_INPUTS_ENROLLMENT).then(response => {
        expect(response.data.state).toEqual('deployed')
      })
    })
  })
})
