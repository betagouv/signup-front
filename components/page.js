import {PIWIK_URL, PIWIK_SITE_ID} from '@env'
import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Spinner from '../components/icons/spinner'
import templateGlobalStyles from 'template.data.gouv.fr/dist/style/main.min.css'
import OAuthClient from '../lib/oauth-client'
import {login, logout, UserContext} from '../lib/auth'
import Header from './header'
import Footer from './footer'
import {OauthLink} from '../pages/oauth-callback.html'

class Page extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null,
      isLoading: true
    }
  }

  componentDidMount() {
    setTimeout(() => {
      if (window.Piwik) {
        const tracker = window.Piwik.getTracker(`${PIWIK_URL}/piwik.php`, PIWIK_SITE_ID)

        if (tracker) {
          tracker.trackPageView()
        }
      }
    }, 300)

    login().then(user => {
      this.setState({user, isLoading: false})
    }).catch(error => {
      console.log(error)
      this.setState({isLoading: false})
    })
  }

  handleDisconnect = event => {
    event.preventDefault()

    this.setState({
      user: null
    })
    logout()
  }

  render() {
    const {children} = this.props
    const {user, isLoading} = this.state
    const authorizeUri = new OAuthClient().getAuthorizationUri()

    return (
      <div className='page'>
        <Head>
          <title>signup.api.gouv.fr</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <link href='/static/styles/custom.css' rel='stylesheet' />
          <link rel='apple-touch-icon' sizes='180x180' href='/static/favicons/apple-icon-180x180.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/static/favicons/favicon-16x16.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/static/favicons/favicon-32x32.png' />
          <link rel='manifest' href='/static/favicons/manifest.json' />
          <link rel='mask-icon' href='/static/favicons/safari-pinned-tab.svg' color='#5bbad5' />
          {PIWIK_URL && <script src={`${PIWIK_URL}/piwik.js`} />}
        </Head>
        <Header user={user} handleDisconnect={this.handleDisconnect} />

        <main>
          {isLoading && (
            <section className='section-grey'>
              <div className='container text-center'>
                <Spinner />
              </div>
            </section>
          )}
          {!isLoading && !user &&
            <section className='section-grey'>
              <div className='container text-center'>
                <h2>Vous devez vous connecter avant de continuer</h2>
                <OauthLink href={authorizeUri} className='button large'>Se connecter</OauthLink>
              </div>
            </section>
          }
          {!isLoading && user && <UserContext.Provider value={user}>{children}</UserContext.Provider>}
        </main>

        <Footer />

        <style
          dangerouslySetInnerHTML={{__html: templateGlobalStyles}} // eslint-disable-line react/no-danger
        />
      </div>
    )
  }
}

Page.propTypes = {
  children: PropTypes.node.isRequired
}

export default Page
