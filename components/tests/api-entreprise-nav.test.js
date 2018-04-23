import ReactTestRenderer from 'react-test-renderer'
import ApiEntrepriseNav from '../api-entreprise-nav'

require('../../lib/tests/local-storage') // eslint-disable-line import/no-unassigned-import

describe('components | ApiEntrepriseNav', () => {
  describe('render', () => {
    const props = {
      children: '<p>Some html</p>'
    }
    const renderer = ReactTestRenderer.create(<ApiEntrepriseNav {...props} />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
