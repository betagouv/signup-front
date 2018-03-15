import ReactTestRenderer from 'react-test-renderer'
import Contact from '../../pages/contact'

describe('pages | contact', () => {
  describe('render', () => {
    const renderer = ReactTestRenderer.create(<Contact />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
