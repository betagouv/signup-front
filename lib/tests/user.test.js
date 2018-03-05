import User from '../../lib/user'
require('./utils')
const nock = require('nock')

describe('User', () => {
  describe('constructor', () => {
    it('should be empty if no token provided', () => {
      const user = new User()
      expect(user.email).not.toBeDefined()
    })
  })

  describe('with a successfull oauth user', () => {
    beforeEach(() => {
      nock('http://localhost:3002')
      .intercept('/api/v1/me', 'OPTIONS')
      .reply(200, null, {
        'access-control-allow-origin': '*',
        'access-control-allow-headers': 'Authorization'
      })

      nock('http://localhost:3002', {
        reqheaders: {
          'Authorization': 'Bearer test'
        }
      })
      .get('/api/v1/me')
      .reply(200, {
        email: "test@test.test"
      })
    })

    it('should login the right user', () => {
      const user = new User()
      return user.login('test').then((user) => {
        expect(user.email).toBe('test@test.test')
      })
    })
  })
})
