import ReactTestRenderer from 'react-test-renderer'
import ApiParticulier from '../../pages/api-particulier'

require('../../lib/tests/local-storage') // eslint-disable-line import/no-unassigned-import

describe('pages | ApiParticulier', () => {
  describe('render', () => {
    const renderer = ReactTestRenderer.create(<ApiParticulier />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
