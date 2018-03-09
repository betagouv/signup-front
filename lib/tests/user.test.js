/* eslint-disable max-nested-callbacks */
import config from '../../lib/config'
import User from '../../lib/user'
import localStorage from './local-storage'

const nock = require('nock')

describe('User', () => {
  describe('constructor', () => {
    it('should be empty if no token provided', () => {
      const user = new User()
      expect(user.email).not.toBeDefined()
    })
  })

  describe('the user is logged in', () => {
    const user = new User()
    user.email = 'test@test.test'

    describe('logout', () => {
      it('removes token from local storage', () => {
        return user.logout().then(() => {
          expect(localStorage.getItem('token')).toBe(null)
        })
      })

      it('reinitializes user', () => {
        return user.logout().then(loggedOutUser => {
          expect(loggedOutUser).toEqual(new User())
        })
      })
    })
  })

  describe('with a bad oauth user', () => {
    nock(config.apiParticulierOAuth.host)
      .intercept('/api/v1/me', 'OPTIONS')
      .reply(200, null, {
        'access-control-allow-origin': '*',
        'access-control-allow-headers': 'Authorization'
      })

    nock(config.apiParticulierOAuth.host, {
      reqheaders: {
        Authorization: 'Bearer boom'
      }
    }).get('/api/v1/me')
      .reply(401, {})

    describe('login', () => {
      it('should delete token in localStorage', () => {
        const user = new User()
        return user.login('boom').then(() => {
          expect(localStorage.getItem('token')).toBe(null)
        })
      })
    })
  })

  describe('with a successfull oauth user', () => {
    nock(config.apiParticulierOAuth.host)
      .intercept('/api/v1/me', 'OPTIONS')
      .reply(200, null, {
        'access-control-allow-origin': '*',
        'access-control-allow-headers': 'Authorization'
      })

    nock(config.apiParticulierOAuth.host, {
      reqheaders: {
        Authorization: 'Bearer test'
      }
    }).get('/api/v1/me')
      .reply(200, {
        email: 'test@test.test'
      })

    it('should login the right user', () => {
      const user = new User()
      return user.login('test').then(user => {
        expect(user.email).toBe('test@test.test')
      })
    })
  })
})
