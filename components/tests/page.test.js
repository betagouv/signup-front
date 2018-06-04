import ReactTestRenderer from 'react-test-renderer'
import Page from '../page'

require('../../lib/tests/local-storage') // eslint-disable-line import/no-unassigned-import

describe('components | Page', () => {
  describe('render', () => {
    const props = {
      children: '<p>Some html</p>'
    }
    const renderer = ReactTestRenderer.create(<Page {...props} />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
