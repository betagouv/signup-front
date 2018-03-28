import ReactTestRenderer from 'react-test-renderer'
import DataSetDescription from '../data-set-description'
import RESOURCE_PROVIDERS from '../../mock/data/resource-providers'

const RESOURCE_PROVIDER = RESOURCE_PROVIDERS[0]

describe('components | DataSetDescription', () => {
  describe('render', () => {
    const renderer = ReactTestRenderer.create(<DataSetDescription dataset={RESOURCE_PROVIDER.scopes[0]} provider={RESOURCE_PROVIDER.short_name} />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
