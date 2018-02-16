
/* eslint no-unused-vars: "error" */
import ReactTestRenderer from 'react-test-renderer'
import {shallow} from 'enzyme'
import Section from '../section'

import Container from '../../container'

describe('components | Section', () => {
  describe('render', () => {
    const renderer = ReactTestRenderer.create(<Section />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })

  describe('Container', () => {
    const props = {
      title: 'The title',
      children: '<p>Some html</p>'
    }
    it('should have proper title', () => {
      const wrapper = shallow(<Section {...props} />)
      const container = wrapper.find(Container)
      expect(container.props().children).toEqual([<h2>The title</h2>, props.children])
    })
  })
})
