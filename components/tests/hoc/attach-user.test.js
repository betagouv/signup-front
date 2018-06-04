import React from 'react'
import {mount} from 'enzyme'
import {JSDOM} from 'jsdom'
import Utils from '../../../lib/utils'
import attachUser from '../../../components/hoc/attach-user'
import User from '../../../lib/user'

class Component extends React.Component {
  render() {
    return <div>some html</div>
  }
}
const AttachedComponent = attachUser(Component)

describe('attach-user', () => {
  describe('constructor', () => {
    it('should initialize state with a new user', () => {
      const rendereredComponent = mount(<AttachedComponent />)
      const user = new User()
      expect(rendereredComponent.state()).toEqual({user})
    })
  })
  describe('componentDidMount', () => {
    delete global.window
    global.window = (new JSDOM(``, {url: 'https://example.org/'})).window

    it('should call extract token function with window location', () => {
      const spy = jest.spyOn(Utils, 'extractTokenFromUrl')
      mount(<AttachedComponent />)
      expect(spy).toHaveBeenCalledWith('https://example.org/')
    })
  })
})
