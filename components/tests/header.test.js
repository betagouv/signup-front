import React from 'react'
import ReactTestRenderer from 'react-test-renderer'
import Header from '../header'
import attachUser from '../../components/hoc/attach-user'

require('../../lib/tests/local-storage') // eslint-disable-line import/no-unassigned-import

class Component extends React.Component {
  render() {
    const {children} = this.props

    return <div>{children}</div>
  }
}

const AttachedComponent = attachUser(Component)

describe('components | Header', () => {
  describe('render', () => {
    const renderer = ReactTestRenderer.create(<AttachedComponent><Header user={function () {}}/></AttachedComponent>)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
