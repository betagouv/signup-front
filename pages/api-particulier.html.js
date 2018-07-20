import React from 'react'
import PropTypes from 'prop-types'
import Page from '../components/page'
import Form from '../components/form'
import ApiParticulierNav from '../components/api-particulier-nav'

import Redirect from '../components/redirect'
import {getQueryVariable} from '../lib/utils'
import ApiParticulierFormConfiguration from '../components/data/api-particulier.form'

const ApiParticulier = ({url}) => {
  const id = getQueryVariable('id')

  return (
    <div>
      <Redirect redirect pathName={url.pathname} />
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

ApiParticulier.propTypes = {
  url: PropTypes.object.isRequired
}

export default ApiParticulier
