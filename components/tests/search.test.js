import ReactTestRenderer from 'react-test-renderer'
import Search from '../search'

describe('components | Search', () => {
  describe('render', () => {
    const renderer = ReactTestRenderer.create(<Search />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
