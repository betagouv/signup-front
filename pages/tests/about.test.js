import ReactTestRenderer from 'react-test-renderer'
import About from '../../pages/about.html'

describe('pages | about', () => {
  describe('render', () => {
    const renderer = ReactTestRenderer.create(<About />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
