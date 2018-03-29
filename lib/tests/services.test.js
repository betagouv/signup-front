import {BACK_HOST} from '@env'
import Services from '../../lib/services'
import FORM_STATE from '../../mock/form/state'

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
