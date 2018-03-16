import {BACK_HOST} from '@env'
import Services from '../../lib/services'
import FORM_STATE from '../../mock/form/state'

const nock = require('nock')

describe.skip('postFormToBack', () => {
  nock(BACK_HOST)
    .post('/api/enrollments/')
    .reply(401)

  // nock(BACK_HOST, {
  //   reqheaders: {
  //     Authorization: 'Bearer boom'
  //   }
  // }).post('/api/enrollments/')
  //   .reply(401, {})
  // const OPTIONS = {
  //   headers: {
  //     Authorization: 'Bearer france_connect',
  //     'Content-Type': 'application/json'
  //   },
  //   body: {}
  // }
  //
  // nock(BACK_HOST)
  //   .post('/api/enrollments/', OPTIONS)
  //   .reply(401)

  describe('state + tout va bien', () => {
    it('should login the right user', () => {
      const state = {}
      return Services.postFormToBack(state).then(response => {
        expect(response).toBe('toto')
      })
    })
  })
})
