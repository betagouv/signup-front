import ReactTestRenderer from 'react-test-renderer'

describe('pages | demandes', () => {
  describe('render', () => {
    const renderer = ReactTestRenderer.create(<demandes />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
