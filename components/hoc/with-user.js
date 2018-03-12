import React from 'react'
import PropTypes from 'prop-types'
import hoist from 'hoist-non-react-statics'

export default Component => hoist(class OuterComponent extends React.Component {
  static contextTypes = {
    user: PropTypes.shape({
      email: PropTypes.string
    })
  }

  render() {
    const {user} = this.context

    return <Component user={user} {...this.props} />
  }
}, Component)
