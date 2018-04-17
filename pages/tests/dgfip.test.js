import ReactTestRenderer from 'react-test-renderer'
import Dgfip from '../../pages/dgfip'

require('../../lib/tests/local-storage') // eslint-disable-line import/no-unassigned-import

describe('pages | dgfip', () => {
  describe('render', () => {
    const props = {
      url: {
        query: {
          id: '1'
        }
      }
    }
    const renderer = ReactTestRenderer.create(<Dgfip {...props} />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
