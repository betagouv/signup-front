import {mount, shallow} from 'enzyme'
import ReactTestRenderer from 'react-test-renderer'
import Index from '../../pages'
import Services from '../../lib/services'
import Section from '../../components/section'
import ResourceProvider from '../../components/resource-provider'
import RESOURCE_PROVIDERS from '../../mock/data/resource-providers'

require('../../lib/tests/local-storage') // eslint-disable-line import/no-unassigned-import

describe.skip('pages | index', () => {
  describe('render', () => {
    describe('snapshot', () => {
      const renderer = ReactTestRenderer.create(<Index />)

      it('should be defined', () => {
        expect(renderer).toBeDefined()
      })

      it('should match snapshot', () => {
        expect(renderer).toMatchSnapshot()
      })
    })
    describe('Section', () => {
      const wrapper = mount(<Index />)
      wrapper.setState({resourceProviders: RESOURCE_PROVIDERS})

      it('should contain france-connect providers list in a section', () => {
        const sections = wrapper
          .find(Section)
          .at(0)
          .props()

        expect(sections.id).toEqual('france-connect')
        expect(sections.children).toHaveLength(2)
      })

      it('should contain api-particulier providers list in a section', () => {
        const sections = wrapper
          .find(Section)
          .at(2)
          .props()

        expect(sections.id).toEqual('api-particulier')
        expect(sections.children).toHaveLength(2)
      })

      it('should contain france-connect data as props in ResourceProvider component', () => {
        const resourceProviderWrapper = wrapper
          .find(ResourceProvider)
          .at(0)

        expect(resourceProviderWrapper.props().resourceProvider).toEqual(RESOURCE_PROVIDERS.franceConnect[0])
      })

      it('should contain api-particulier data as props in ResourceProvider component', () => {
        const resourceProviderWrapper = wrapper
          .find(ResourceProvider)
          .at(1)

        expect(resourceProviderWrapper.props().resourceProvider).toEqual(RESOURCE_PROVIDERS.apiParticulier[0])
      })
    })
  })

  describe('constructor', () => {
    it('should initialize state with data', () => {
      const componentInitialState = {
        resourceProviders: {
          franceConnect: [],
          apiParticulier: []
        }
      }
      const wrapper = shallow(<Index />)

      expect(wrapper.state()).toEqual(componentInitialState)
    })
  })

  describe('componentDidMount', () => {
    it('should call fetch resourceProviders data from api Services call', () => {
      const spy = jest.spyOn(Services, 'getResourceProviderService')
      mount(<Index />)

      expect(spy).toHaveBeenCalled()
    })
  })
})
