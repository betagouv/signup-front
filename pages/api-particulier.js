import React from 'react'
import Page from '../components/page'
import ApiParticulierForm from '../components//api-particulier-form'
import ApiParticulierNav from '../components/api-particulier-nav'

const ApiParticulier = () => (
  <Page>
    <div className='documentation'>
      <ApiParticulierNav />
      <ApiParticulierForm />
    </div>
  </Page>
)

export default ApiParticulier
