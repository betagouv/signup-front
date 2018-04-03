import React from 'react'
import Page from '../components/page'
import ContractualisationForm from '../components/contractualisation-form'
import ContractualisationNav from '../components/contractualisation-nav'

const Index = () => (
  <Page>
    <div className='documentation'>
      <ContractualisationNav />
      <ContractualisationForm />
    </div>
  </Page>
)

export default Index
