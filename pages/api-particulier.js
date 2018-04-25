import React from 'react'
import Page from '../components/page'
import ApiParticulierForm from '../components//api-particulier-form'
import ApiParticulierNav from '../components/api-particulier-nav'
import Redirect from '../components/redirect'

class ApiParticulier extends React.Component {
  render() {
    const {url} = this.props
    return(
      <div>
      <Redirect pathName={url.pathname} />
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

export default ApiParticulier
