import ReactTestRenderer from 'react-test-renderer'
import Services from '../services'
import RESOURCE_PROVIDERS from '../../mock/data/resource-providers'

const RESOURCE_PROVIDER = RESOURCE_PROVIDERS[0]
const SERVICES = RESOURCE_PROVIDER.scopes[0].services

describe('components | Services', () => {
  describe('render', () => {
    const props = {
      lists: SERVICES
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
