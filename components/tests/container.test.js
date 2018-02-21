import ReactTestRenderer from 'react-test-renderer'
import Container from '../container'

describe('components | Container', () => {
  describe('render', () => {
    const props = {
      children: '<p>Some html</p>'
    }
    const renderer = ReactTestRenderer.create(<Container {...props} />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
