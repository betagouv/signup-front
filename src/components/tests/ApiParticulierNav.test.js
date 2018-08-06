import ReactTestRenderer from 'react-test-renderer'
import ApiParticulierNav from '../ApiParticulierNav'

require('../../lib/tests/local-storage') // eslint-disable-line import/no-unassigned-import

describe('components | ApiParticulierNav', () => {
  describe('render', () => {
    const props = {
      children: '<p>Some html</p>'
    }
    const renderer = ReactTestRenderer.create(<ApiParticulierNav {...props} />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
