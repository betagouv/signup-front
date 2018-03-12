import ReactTestRenderer from 'react-test-renderer'
import {JSDOM} from 'jsdom'
import {mount} from 'enzyme'
import Utils from '../../lib/utils'
import Header from '../header'
import User from '../../lib/user'

require('../../lib/tests/local-storage') // eslint-disable-line import/no-unassigned-import

describe('components | Header', () => {
  describe('constructor', () => {
    it('should initialize state with a new user', () => {
      const rendereredComponent = mount(<Header />)
      const user = new User()
      expect(rendereredComponent.state()).toEqual({user})
    })
  })
  describe('componentDidMount', () => {
    delete global.window
    global.window = (new JSDOM(``, {url: 'https://example.org/'})).window
    describe('When window is defined', () => {
      const spy = jest.spyOn(Utils, 'extractTokenFromUrl')
      it('should call extract token function with window location', () => {
        mount(<Header />)
        expect(spy).toHaveBeenCalledWith('https://example.org/')
      })
    })
  })
  describe('render', () => {
    const renderer = ReactTestRenderer.create(<Header />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
