
import ReactTestRenderer from 'react-test-renderer'

describe('pages | about', () => {
  describe('render', () => {
    const renderer = ReactTestRenderer.create(<about />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
