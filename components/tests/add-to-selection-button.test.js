import ReactTestRenderer from 'react-test-renderer'
import AddToSelectionButton from '../add-to-selection-button'

describe('components | AddToSelectionButton', () => {
  describe('render', () => {
    const renderer = ReactTestRenderer.create(<AddToSelectionButton />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
