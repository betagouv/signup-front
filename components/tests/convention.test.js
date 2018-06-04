import ReactTestRenderer from 'react-test-renderer'
import Convention from '../footer'

describe('components | Convention', () => {
  describe('render', () => {
    const renderer = ReactTestRenderer.create(<Convention />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
