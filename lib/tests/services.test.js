import {BACK_HOST} from '@env'
import Services from '../../lib/services'
import FORM_STATE from '../../mock/form/state'
import ENROLLMENTS from '../../mock/data/enrollments'

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
