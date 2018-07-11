import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import templateGlobalStyles from 'template.data.gouv.fr/dist/style/main.min.css'
import attachUser from '../components/hoc/attach-user'
import OAuth from '../lib/oauth'
import User from '../lib/user'
import Header from './header'
import Footer from './footer'
import Section from './section'

const {PIWIK_URL, PIWIK_SITE_ID} = process.env

class Page extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {}
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

    const user = new User()

    user.login().then(user => {
      this.setState({user})
    })
  }

  render() {
    const oauth = new OAuth()
    const {title, children, requireUser} = this.props
    const {user} = this.state
    const checkUser = () => requireUser && !(user && user.loggedIn)

    return (
      <div className='page'>
        <Head key='first' >
          <title>signup.api.gouv.fr</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <link href='/static/styles/custom.css' rel='stylesheet' />
          <link rel='apple-touch-icon' sizes='180x180' href='/static/favicons/apple-icon-180x180.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/static/favicons/favicon-16x16.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/static/favicons/favicon-32x32.png' />
          <link rel='manifest' href='/static/favicons/manifest.json' />
          <link rel='mask-icon' href='/static/favicons/safari-pinned-tab.svg' color='#5bbad5' />
          <script src={`${PIWIK_URL}/piwik.js`} />
        </Head>
        <Header key='second' />

        <main>
          {
            checkUser() ?
              <Section className='section-grey'>
                <div className='container text-center'>
                  <h2>Vous devez vous connecter avant de continuer</h2>
                  <a className='button large' href={oauth.client.token.getUri()}>Se connecter</a>
                </div>
              </Section> :
              <div key='three'>{title}{children}</div>
          }
        </main>

        <Footer key='four' />

        <style
          dangerouslySetInnerHTML={{__html: templateGlobalStyles}} // eslint-disable-line react/no-danger
        />
      </div>
    )
  }
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  requireUser: PropTypes.bool
}

Page.defaultProps = {
  title: '',
  requireUser: false
}

export default attachUser(Page)
