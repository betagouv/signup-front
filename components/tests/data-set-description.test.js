import ReactTestRenderer from 'react-test-renderer'
import DGFIP_DATA_SET from '../../mock/data/dgfip'
import DataSetDescription from '../data-set-description'

describe('components | DataSetDescription', () => {
  describe('render', () => {
    const renderer = ReactTestRenderer.create(<DataSetDescription dataset={DGFIP_DATA_SET.availables_data_sets[0]} />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
