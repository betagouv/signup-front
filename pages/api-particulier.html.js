import React from 'react'
import PropTypes from 'prop-types'
import Page from '../components/page'
import Form from '../components/form'
import ApiParticulierFormConfiguration from '../components/data/api-particulier.form'
import ApiParticulierNav from '../components/api-particulier-nav'
import Redirect from '../components/redirect'

class ApiParticulier extends React.Component {
  getQueryVariable(variable) {
    if (typeof window === 'undefined') {
      return null
    }

    const query = window.location.search.substring(1)
    const vars = query.split('&')

    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=')
      if (decodeURIComponent(pair[0]) === variable) {
        return decodeURIComponent(pair[1])
      }
    }

    console.log('Query variable %s not found', variable)
  }

  render() {
    const {url} = this.props
    const id = this.getQueryVariable('id')

    return (
      <div>
        <Redirect pathName={url.asPath} />
        <Page requireUser>
          <div className='documentation'>
            <ApiParticulierNav />
            <div className='main-pane'>
              <Form id={id} form={ApiParticulierFormConfiguration} />
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
