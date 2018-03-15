import ReactTestRenderer from 'react-test-renderer'
import RestrictedPage from '../page'
import localStorage from '../../lib/tests/local-storage'

describe('components | RestrictedPage', () => {
  describe('render', () => {
    describe('while not loggedIn', () => {
      const props = {
        children: '<p>Some html</p>'
      }
      const renderer = ReactTestRenderer.create(<RestrictedPage {...props} />)

      beforeEach(() => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      })

      it('should be defined', () => {
        expect(renderer).toBeDefined()
      })
      it('should match snapshot', () => {
        expect(renderer).toMatchSnapshot()
      })
    })

    describe('while loggedIn', () => {
      const props = {
        children: '<p>Some html</p>'
      }
      const renderer = ReactTestRenderer.create(<RestrictedPage {...props} />)

      beforeEach(() => {
        localStorage.setItem('user', {
          email: 'test@test.test',
          loggedIn: true
        })
      })

      afterEach(() => {
        localStorage.removeItem('user')
      })

      it('should be defined', () => {
        expect(renderer).toBeDefined()
      })
      it('should match snapshot', () => {
        expect(renderer).toMatchSnapshot()
      })
    })
  })
})
