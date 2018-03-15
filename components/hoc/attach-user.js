import React from 'react'
import PropTypes from 'prop-types'
import User from '../../lib/user'
import Utils from '../../lib/utils'

export default Component => class extends React.PureComponent {
  static childContextTypes = {
    user: PropTypes.shape({
      email: PropTypes.string
    })
  }

  state = {user: new User()}

  static async getInitialProps(context) {
    const props = Component.getInitialProps ? await Component.getInitialProps(context) : {}

    return props
  }

  componentDidMount() {
    const {user} = this.state

    if (typeof window !== 'undefined') {
      if (!user.loggedIn) {
        console.log(user)
        const token = Utils.extractTokenFromUrl(window.location.toString())
        user.login(token).then(user => {
          this.setState({user})
        })
      }
    }
    this.setState({user: new User()})
  }

  getChildContext() {
    const {user} = this.state

    return {user}
  }

  render() {
    const {user} = this.state

    return (
      <Component user={user} {...this.props} />
    )
  }
}
