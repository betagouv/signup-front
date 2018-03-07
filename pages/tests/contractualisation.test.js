import ReactTestRenderer from 'react-test-renderer'

describe('pages | contractualisation', () => {
  describe('render', () => {
    const renderer = ReactTestRenderer.create(<contractualisation />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
