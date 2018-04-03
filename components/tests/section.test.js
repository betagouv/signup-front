
/* eslint no-unused-vars: "error" */
import ReactTestRenderer from 'react-test-renderer'
import {shallow} from 'enzyme'
import Section from '../section'

describe('components | Section', () => {
  describe('render', () => {
    const props = {
      className: 'className',
      title: 'The title',
      children: '<p>Some html</p>'
    }
    const renderer = ReactTestRenderer.create(<Section {...props} />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })

  describe('Container', () => {
    const props = {
      className: 'A className',
      title: 'The title',
      children: '<p>Some html</p>'
    }
    it('should have proper title and content', () => {
      const wrapper = shallow(<Section {...props} />)
      expect(wrapper.props().children).toEqual([<h2 className="section__title">The title</h2>, '<p>Some html</p>'])
    })
  })
})
