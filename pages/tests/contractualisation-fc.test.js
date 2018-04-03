import ReactTestRenderer from 'react-test-renderer'

describe('pages | contractualisation-fc', () => {
  describe('render', () => {
    const renderer = ReactTestRenderer.create(<contractualisation-fc />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
