import ReactTestRenderer from 'react-test-renderer'
import DGFIP_DATA_SET from '../../mock/data/dgfip'
import Services from '../services'

describe('components | Services', () => {
  describe('render', () => {
    const props = {
      lists: DGFIP_DATA_SET.availables_data_sets[0].services
    }
    const renderer = ReactTestRenderer.create(<Services {...props} />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
