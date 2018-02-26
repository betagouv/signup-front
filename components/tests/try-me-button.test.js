import ReactTestRenderer from 'react-test-renderer'
import TryMeButton from '../try-me-button'

describe('components | TryMeButton', () => {
  describe('render', () => {
    const props = {
      url: 'http://fakeurl.com'
    }
    const renderer = ReactTestRenderer.create(<TryMeButton {...props} />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
