import {BACK_HOST} from '@env'
import Services from '../../lib/services'
import FORM_STATE from '../../mock/form/state'
import ENROLLMENTS from '../../mock/data/enrollments'
import RESOURCE_PROVIDERS from '../../mock/data/resource-providers'
import USER_ENROLLMENT from '../../mock/data/user-enrollment'
import USER_2_ENROLLMENT from '../../mock/data/user-2-enrollment'

const nock = require('nock')

describe('createUserEnrollment', () => {
  describe('When the user is not authorized', () => {
    nock(BACK_HOST, {
      reqheaders: {
        Authorization: 'Bearer boom',
        'Content-Type': 'application/json'
      }
    }).post('/api/enrollments/', FORM_STATE)
      .reply(401, {})

    it('should return a 401', () => {
      const state = FORM_STATE
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
      }).post('/api/enrollments/', FORM_STATE)
        .reply(201, {})
      it('should return a 201 code', () => {
        const state = FORM_STATE
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
    }).patch('/api/enrollments/1', USER_2_ENROLLMENT)
      .reply(200, USER_2_ENROLLMENT)
    it('should return the data', () => {
      const token = 'test'
      const id = 1
      return Services.updateUserEnrollment(USER_2_ENROLLMENT, token, id).then(response => {
        expect(response.data).toEqual(USER_2_ENROLLMENT)
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
  describe('When there is an error', () => {})
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
      .reply(200, USER_ENROLLMENT)
    it('should return a 200 status', () => {
      const token = 'test'
      return Services.getUserEnrollment(1, token).then(response => {
        expect(response).toEqual(USER_ENROLLMENT)
      })
    })
  })
  describe('When there is an error', () => {})
})
