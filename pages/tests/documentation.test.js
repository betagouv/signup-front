import ReactTestRenderer from 'react-test-renderer'
import Documentation from '../../pages/documentation'

describe('pages | documentation', () => {
  describe('render', () => {
    const renderer = ReactTestRenderer.create(<Documentation />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
