import React from 'react'
import PropTypes from 'prop-types'

class Redirect extends React.Component {
  constructor(props) {
    super(props)

    const {pathName} = this.props

    this.state = {
      pathName
    }
  }

  componentDidMount() {
    const {pathName} = this.state

    localStorage.setItem('redirect', pathName || '')
  }

  render() {
    return <div className='redirect' />
  }
}

Redirect.propTypes = {
  pathName: PropTypes.string
}

Redirect.defaultProps = {
  pathName: '/'
}

export default Redirect
