import ReactTestRenderer from 'react-test-renderer'
import ResourceProvider from '../resource-provider'
import RESOURCE_PROVIDERS from '../../mock/data/resource-providers'

describe('components | DataSet', () => {
  describe('render', () => {
    const resourceProvider = RESOURCE_PROVIDERS.franceConnect[0]
    const renderer = ReactTestRenderer.create(<ResourceProvider resourceProvider={resourceProvider}/>)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
