import ReactTestRenderer from 'react-test-renderer'

describe('components | Header', () => {
  describe('render', () => {
    const renderer = ReactTestRenderer.create(<Header />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
