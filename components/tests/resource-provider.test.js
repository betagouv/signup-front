import ReactTestRenderer from 'react-test-renderer'
import ResourceProvider from '../resource-provider'
import RESOURCE_PROVIDERS from '../../mock/data/resource-providers'
const RESOURCE_PROVIDER = RESOURCE_PROVIDERS[0]

describe('components | DataSet', () => {
  describe('render', () => {
    const renderer = ReactTestRenderer.create(<ResourceProvider resourceProvider={RESOURCE_PROVIDER} />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
