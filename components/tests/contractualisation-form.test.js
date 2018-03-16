import {mount, shallow} from 'enzyme'
import ReactTestRenderer from 'react-test-renderer'
import ContractualisationForm from '../contractualisation-form'

describe('components | ContractualisationForm', () => {
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
      // EX https://codereview.stackexchange.com/questions/152918/unit-tests-for-react-component-to-submit-an-input-form-with-validation
      const wrapper = mount(<ContractualisationForm />)
      wrapper.find('form').simulate('submit', {preventDefault: jest.fn()})
    })
  })
})
