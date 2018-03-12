import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import attachUser from '../components/hoc/attach-user'
import Header from './header'
import Footer from './footer'

class Page extends React.Component {
  render() {
    const {title, children} = this.props

    return (
      <div className='page'>
        <Head key='first' >
          <title>particulier.api.gouv.fr</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <link href='https://rawgit.com/etalab/template.data.gouv.fr/master/template.css' rel='stylesheet' />
          <link href='/static/styles/custom.css' rel='stylesheet' />
        </Head>
        <Header key='second' />
        <div key='three'>{title}{children}</div>
        <Footer key='four' />
      </div>
    )
  }
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
}

Page.defaultProps = {
  title: ''
}

export default attachUser(Page)
