import React from 'react'
import PropTypes from 'prop-types'
import attachUser from '../components/hoc/attach-user'
import withUser from '../components/hoc/with-user'
import Page from '../components/page'
import Section from '../components/section'

class InnerPageWithoutUser extends React.Component {
  constructor(props) {
    super(props)

    const {user} = this.props
    this.state = {user}
  }

  render() {
    const {title} = this.props
    const {user} = this.state
    return (
      <div className='page'>
        {user.loggedIn &&
          <Page {...this.props} />
        }
        {!user.loggedIn &&
          <Page title={title}>
            <Section className='section-grey'>
              <div className='container'>
                <h2 className='section__title'>Vous devez vous connecter avant de continuer</h2>
              </div>
            </Section>
          </Page>
        }
      </div>
    )
  }
}

InnerPageWithoutUser.propTypes = {
  user: PropTypes.object,
  title: PropTypes.string
}
InnerPageWithoutUser.defaultProps = {
  user: {},
  title: ''
}

const InnerPage = withUser(InnerPageWithoutUser)

class RestrictedPage extends React.Component {
  render() {
    return (
      <InnerPage {...this.props} />
    )
  }
}

RestrictedPage.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
}
RestrictedPage.defaultProps = {
  title: ''
}

export default attachUser(RestrictedPage)
