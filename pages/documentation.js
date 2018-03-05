import React from 'react'
import Link from 'next/link'
import Page from '../components/page'
import Section from '../components/section'

const Documentation = () => (
  <Page>
    <Section title='Documentation technique'>
      <div className='container'>
        <p>Vous pouvez, dès maintenant, commencer à intégrer API Particulier :</p>
        <Link href='https://particulier.api.gouv.fr/tech/'><a>espace développeur</a></Link>
      </div>
    </Section>
  </Page>
)

export default Documentation
