import React from 'react'
import Link from 'next/link'
import Page from '../components/page'
import EnrollmentTable from '../components/enrollment-table'
import {UserContext} from '../lib/auth'

const Index = () => (
  <Page>
    <section className='section-grey'>
      <div className='container'>
        <h2>Liste des demandes</h2>
        <div className='panel'>
          <UserContext.Consumer>
            {user => <EnrollmentTable user={user} />}
          </UserContext.Consumer>
          <p className='text-right'>
            <Link href={{pathname: '/api-particulier.html'}}>
              <a className='button large' name='nouvelle-demande'>
                Nouvelle Demande
              </a>
            </Link>
          </p>
        </div>
      </div>
    </section>
  </Page>
)

export default Index
