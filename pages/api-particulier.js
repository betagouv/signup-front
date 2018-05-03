import React from 'react'
import PropTypes from 'prop-types'
import Page from '../components/page'
import ApiParticulierForm from '../components/api-particulier-form'
import ApiParticulierNav from '../components/api-particulier-nav'
import Redirect from '../components/redirect'

class ApiParticulier extends React.Component {
  render() {
    const {url} = this.props

    return (
      <div>
        <Redirect pathName={url.asPath} />
        <Page requireUser>
          <div className='documentation'>
            <ApiParticulierNav />
            <div className='main-pane'>
              <ApiParticulierForm id={url.query.id} />
            </div>
          </div>
        </Page>
      </div>
    )
  }
}

ApiParticulier.propTypes = {
  url: PropTypes.object.isRequired
}

export default ApiParticulier
