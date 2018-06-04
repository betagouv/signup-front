import React from 'react'
import Router from 'next/router'

class OauthCallback extends React.Component {
  componentDidMount() {
    const storedPath = localStorage.getItem('redirect') || '/'

    Router.push(storedPath)
    localStorage.removeItem('redirect')
  }

  render() {
    return <div className='redirect'><h1>Vous allez être redirigé dans un instant</h1></div>
  }
}

export default OauthCallback
