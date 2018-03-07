
/* eslint no-unused-vars: "error" */
import ReactTestRenderer from 'react-test-renderer'
import {shallow} from 'enzyme'
import Section from '../section'

describe('components | Section', () => {
  describe('render', () => {
    const props = {
      className: 'className',
      title: 'The title',
      imageSrc: '/somepath/image.png',
      altText: 'some alternative text',
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
      imageSrc: '/somepath/image.png',
      altText: 'some alternative text',
      children: '<p>Some html</p>'
    }
    it('should have proper title and content', () => {
      const wrapper = shallow(<Section {...props} />)
      expect(
        wrapper
          .find('div')
          .at(0)
          .props().children,
      ).toEqual([<h2 className="section__title">The title</h2>, '<p>Some html</p>'])
    })
    it('should have proper image with alternative texte', () => {
      const wrapper = shallow(<Section {...props} />)
      expect(
        wrapper
          .find('div')
          .at(1)
          .props().children,
      ).toEqual(<img alt={props.altText} src={props.imageSrc} />)
    })
  })
})
