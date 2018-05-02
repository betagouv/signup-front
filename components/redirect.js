import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

class Redirect extends React.Component {
  constructor(props) {
    super(props)

    const {redirect, pathName} = this.props

    this.state = {
      redirect,
      pathName
    }
  }

  componentDidMount() {
    const storedPath = localStorage.getItem('redirect') || '/'
    const {redirect, pathName} = this.state

    if (redirect) {
      Router.push(storedPath)

      localStorage.removeItem('redirect')
    } else {
      localStorage.setItem('redirect', pathName || '')
    }
  }

  render() {
    return <div className='redirect' />
  }
}

Redirect.propTypes = {
  redirect: PropTypes.bool,
  pathName: PropTypes.string
}

Redirect.defaultProps = {
  redirect: false,
  pathName: '/'
}

export default Redirect
