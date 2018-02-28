import ReactTestRenderer from 'react-test-renderer'
import DataSet from '../data-set'
import DGFIP_DATA_SET from '../../mock/data/dgfip'

describe('components | DataSet', () => {
  describe('render', () => {
    const renderer = ReactTestRenderer.create(<DataSet props={DGFIP_DATA_SET} />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
