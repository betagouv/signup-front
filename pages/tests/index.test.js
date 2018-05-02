import ReactTestRenderer from 'react-test-renderer'
import Index from '../../pages'

require('../../lib/tests/local-storage') // eslint-disable-line import/no-unassigned-import

describe('pages | index', () => {
  describe('render', () => {
    const props = {
      url: {
        query: {
          id: '1'
        }
      }
    }
    const renderer = ReactTestRenderer.create(<Index {...props} />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
