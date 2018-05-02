import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

class Redirect extends React.Component {
  constructor(props) {
    super(props)

    const {redirect} = this.props

    if (redirect) {
      this.state = {redirect: true}
    } else {
      this.state = {redirect: false}
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
  redirect: PropTypes.bool
}

Redirect.defaultProps = {
  redirect: false
}

export default Redirect
