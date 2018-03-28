import {mount, shallow} from 'enzyme'
import ReactTestRenderer from 'react-test-renderer'
import ContractualisationForm from '../contractualisation-form'
import Services from '../../lib/services'
import localStorage from '../../lib/tests/local-storage' // eslint-disable-line no-unused-vars
import FORM_STATE from '../../mock/form/state'

require('../../lib/tests/local-storage') // eslint-disable-line import/no-unassigned-import

describe('components | ContractualisationForm', () => {
  describe('constructor', () => {
    it('should initialize state with an empty json', () => {
      const wrapper = shallow(<ContractualisationForm />)
      const componentInitialState = FORM_STATE
      expect(wrapper.state()).toEqual(componentInitialState)
    })
  })

  describe('render', () => {
    const props = {
      children: '<p>Some html</p>'
    }
    const renderer = ReactTestRenderer.create(<ContractualisationForm {...props} />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
    describe('form', () => {
      let props
      let wrapper
      it('should have a `<form>` element', () => {
        props = {
          handleSubmit: () => {
          }
        }
        wrapper = shallow(<ContractualisationForm {...props} />)
        expect(wrapper.find('form')).toHaveLength(1)
      })

      describe('handleInputChange', () => {
        it('should update the state when a value is input', () => {
          wrapper = shallow(<ContractualisationForm />)
          const name = 'Fake Value'
          const textarea = wrapper.find('textarea').at(0)
          textarea.simulate('change', {
            target: {
              name: 'legal1',
              value: name
            }
          })
          expect(
            wrapper.state().legal1
          ).toBe(name)
        })
      })

      describe('handleSubmit', () => {
        it('should call the services with the good parameters', () => {
          const spy = jest.spyOn(Services, 'postFormToBack')
          localStorage.setItem('token', 'fakeToken')
          const wrapper = mount(<ContractualisationForm />)
          const componentInitialState = wrapper.state()
          wrapper.find('form').simulate('submit', {preventDefault: jest.fn()})
          expect(spy).toHaveBeenCalledWith(componentInitialState, 'fakeToken')
        })
      })
    })
  })
})
