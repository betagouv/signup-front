import {mount, shallow} from 'enzyme'
import ReactTestRenderer from 'react-test-renderer'
import ApiEntrepriseForm from '../api-entreprise-form'
import Services from '../../lib/services'
import localStorage from '../../lib/tests/local-storage' // eslint-disable-line no-unused-vars
import FORM_STATE from '../../mock/enrollment-form/initial-state-enrollment'

require('../../lib/tests/local-storage') // eslint-disable-line import/no-unassigned-import

describe('components | ApiEntrepriseForm', () => {
  describe('constructor', () => {
    it.skip('should initialize state with an empty json', () => {
      const wrapper = shallow(<ApiEntrepriseForm />)
      const componentInitialState = FORM_STATE
      expect(wrapper.state()).toEqual(componentInitialState)
    })
  })

  describe('render', () => {
    const props = {
      children: '<p>Some html</p>'
    }
    const renderer = ReactTestRenderer.create(<ApiEntrepriseForm {...props} />)
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
        wrapper = shallow(<ApiEntrepriseForm {...props} />)
        expect(wrapper.find('form')).toHaveLength(1)
      })

      describe('handleInputChange', () => {
        it('should update the state when a value is input', () => {
          wrapper = shallow(<ApiEntrepriseForm />)
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
    })
  })
})
