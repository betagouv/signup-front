import {extractTokenFromUrl, deepSetInState} from '../utils'

describe('utils', () => {
  describe('extractTokenFromUrl', () => {
    describe('I have an url without hash', () => {
      const url = 'http://localhost:3000'

      it('should return nothing', () => {
        const token = extractTokenFromUrl(url)
        expect(token).toBe('')
      })
    })

    describe('I have an oauth url', () => {
      const url = 'http://localhost:3000/#access_token=e5498b836ef3abfb3e33c20116c06e293fca47c2970df5344cfb49353273586c&token_type=bearer&expires_in=7200'

      it('should return token', () => {
        const token = extractTokenFromUrl(url)

        expect(token).toBe('e5498b836ef3abfb3e33c20116c06e293fca47c2970df5344cfb49353273586c')
      })
    })
  })
  describe('deepSetInState', () => {
    it('should return updated state with value', () => {
      const name = 'key1.key2'
      const value = 'testValue'
      const state = Object.assign({
        key1: {
          key2: ''
        }
      })
      const updatedState = Object.assign({
        key1: {
          key2: value
        }
      })

      deepSetInState(name, value, state)
      expect(state).toEqual(updatedState)
    })

    it('it should return updated state with a new node when name is a string without dot', () => {
      const name = 'key3'
      const value = 'testValue'
      const state = Object.assign({
        key1: {
          key2: ''
        }
      })
      const updatedState = Object.assign({
        key1: {
          key2: ''
        },
        key3: value
      })

      deepSetInState(name, value, state)
      expect(state).toEqual(updatedState)
    })
  })
})
