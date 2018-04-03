import ReactTestRenderer from 'react-test-renderer'
import Demandes from '../../pages/demandes'

require('../../lib/tests/local-storage') // eslint-disable-line import/no-unassigned-import

describe('pages | demandes', () => {
  describe('render', () => {
    const renderer = ReactTestRenderer.create(<Demandes />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
