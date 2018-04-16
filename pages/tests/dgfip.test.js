import ReactTestRenderer from 'react-test-renderer'

describe('pages | dgfip', () => {
  describe('render', () => {
    const renderer = ReactTestRenderer.create(<dgfip />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
