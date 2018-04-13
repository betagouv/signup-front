import ReactTestRenderer from 'react-test-renderer'
import ContractualisationNav from '../contractualisation-nav'

require('../../lib/tests/local-storage') // eslint-disable-line import/no-unassigned-import

describe('components | ContractualisationNav', () => {
  describe('render', () => {
    const props = {
      children: '<p>Some html</p>'
    }
    const renderer = ReactTestRenderer.create(<ContractualisationNav {...props} />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
