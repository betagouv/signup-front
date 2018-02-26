import ReactTestRenderer from 'react-test-renderer'

describe('pages | documentation', () => {
  describe('render', () => {
    const renderer = ReactTestRenderer.create(<documentation />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
