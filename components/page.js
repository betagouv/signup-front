import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import attachUser from '../components/hoc/attach-user'
import Header from './header'
import Footer from './footer'
import Section from './section'

class Page extends React.Component {
  render() {
    const {title, children, requireUser, user} = this.props
    const checkUser = () => requireUser && !(user && user.loggedIn)

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

        {
          checkUser() ?
            <Section className='section-grey'>
              <div className='container'>
                <h2 className='section__title'>Vous devez vous connecter avant de continuer</h2>
              </div>
            </Section> :
            <div key='three'>{title}{children}</div>
        }

        <Footer key='four' />
      </div>
    )
  }
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  user: PropTypes.object,
  requireUser: PropTypes.bool
}

Page.defaultProps = {
  title: '',
  requireUser: false,
  user: {}
}

export default attachUser(Page)
