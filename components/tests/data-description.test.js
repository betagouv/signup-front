import ReactTestRenderer from 'react-test-renderer'
import DataDescription from '../data-description'
import DGFIP_DATA_SET from '../../mock/data/dgfip'

describe('components | DataDescription', () => {
  describe('render', () => {
    const props = {
      dataset: DGFIP_DATA_SET
    }
    const renderer = ReactTestRenderer.create(<DataDescription {...props} />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
