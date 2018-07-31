import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import {extractTokenFromUrl, getQueryVariable} from '../lib/utils'

export const saveCurrentPageForPostloginRedirect = () =>
  localStorage.setItem('returnUrl', window.location.href)

export class OauthLink extends React.Component {
  handleAuthoriseClick = event => {
    event.preventDefault()

    if (!localStorage.getItem('returnUrl')) {
      localStorage.setItem('returnUrl', window.location.href)
    }

    Router.push(this.props.href)
  }

  render() {
    const {className} = this.props

    return (
      <a onClick={this.handleAuthoriseClick} className={className}>{this.props.children}</a>
    )
  }
}

OauthLink.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export class OauthCallback extends React.Component {
  componentDidMount() {
    const storedPath = new URL(localStorage.getItem('returnUrl') || window.location.origin)
    localStorage.removeItem('returnUrl')

    const token = extractTokenFromUrl(window.location.toString())
    if (token) {
      localStorage.setItem('token', token)
    }

    const tokenFc = getQueryVariable('token-fc')
    if (tokenFc) {
      storedPath.searchParams.set('token-fc', tokenFc)
    }

    Router.push(storedPath)
  }

  render() {
    return <div className='redirect'><h1>Vous allez être redirigé dans un instant</h1></div>
  }
}

export default OauthCallback
