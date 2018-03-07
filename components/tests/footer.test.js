import ReactTestRenderer from 'react-test-renderer'
import Footer from '../footer'

describe('components | Footer', () => {
  describe('render', () => {
    const renderer = ReactTestRenderer.create(<Footer />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
