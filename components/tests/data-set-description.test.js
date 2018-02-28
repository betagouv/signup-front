import ReactTestRenderer from 'react-test-renderer'
import DGFIP_DATA_SET from '../../mock/data/dgfip'
import DataSetDescription from '../data-set-description'

describe('components | DataSetDescription', () => {
  describe('render', () => {
    const props = {
      dataset: DGFIP_DATA_SET
    }
    const renderer = ReactTestRenderer.create(<DataSetDescription {...props} />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
