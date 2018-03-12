import React from 'react'
import Page from '../components/page'
import ContractualisationForm from '../components/contractualisation-form'
import ContractualisationNav from '../components/contractualisation-nav'

const Index = () => (
  <Page>
    <div>
      <div className='documentation'>
        <ContractualisationNav />
        <div className='main-pane'>
          <ContractualisationForm />
        </div>
      </div>

    </div>
  </Page>
)

export default Index
