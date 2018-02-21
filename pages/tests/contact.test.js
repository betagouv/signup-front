import ReactTestRenderer from 'react-test-renderer'

describe('pages | contact', () => {
  describe('render', () => {
    const renderer = ReactTestRenderer.create(<contact />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
