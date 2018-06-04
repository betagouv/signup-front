import React from 'react'
import PropTypes from 'prop-types'
import User from '../../lib/user'

const attachUser = Component => {
  class InnerComponent extends React.PureComponent {
    constructor(props) {
      super(props)
      this.state = {user: new User()}
    }

    static async getInitialProps(context) {
      const props = Component.getInitialProps ? await Component.getInitialProps(context) : {}

      return props
    }

    getChildContext() {
      const {user} = this.state

      return {user: () => user}
    }

    render() {
      const {user} = this.state

      return (
        <Component user={user} {...this.props} />
      )
    }
  }

  InnerComponent.childContextTypes = {
    user: PropTypes.func
  }

  return InnerComponent
}

export default attachUser
