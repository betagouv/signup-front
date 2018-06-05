import ReactTestRenderer from 'react-test-renderer'
import ApiParticulier from '../../pages/api-particulier.html'

require('../../lib/tests/local-storage') // eslint-disable-line import/no-unassigned-import

describe('pages | ApiParticulier', () => {
  describe('render', () => {
    const renderer = ReactTestRenderer.create(<ApiParticulier url={{query: {}}}/>)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})