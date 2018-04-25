import React from 'react'
import Router from 'next/router'

class Redirect extends React.Component {
  constructor(props) {
    super(props)

    if(this.props.redirect) {
      this.state = {redirect: true}
    } else {
      this.state = {redirect: false}
    }
  }
  componentDidMount() {
    const storedPath = localStorage.getItem('redirect') || '/'

    if (this.state.redirect) {
      Router.push(storedPath)

      localStorage.removeItem('redirect')
    } else {
      localStorage.setItem('redirect', this.props.pathName || '')
    }
  }

  render() {
    return <div></div>
  }
}

export default Redirect
