import ReactTestRenderer from 'react-test-renderer'
import LinkButton from '../try-me-button'

describe('components | LinkButton', () => {
  describe('render', () => {
    const props = {
      url: 'http://fakeurl.com',
      text: 'fake text'
    }
    const renderer = ReactTestRenderer.create(<LinkButton {...props} />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
