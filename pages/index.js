import React from 'react'
import Link from 'next/link'
import Page from '../components/page'
import EnrollmentTable from '../components/enrollment-table'

const Index = () => (
  <div>
    <Page requireUser>
      <section className='section-grey'>
        <div className='container'>
          <h2>Liste des demandes</h2>
          <div className='panel'>
            <EnrollmentTable />
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
  </div>
)

export default Index
