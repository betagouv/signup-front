import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Page from '../components/page'
import Section from '../components/section'

const Documentation = () => (
  <Page>
    <Head>
      <title>Documentation - particulier.api.gouv.fr</title>
    </Head>
    <Section title='Documentation technique'>
      <div className='container'>
        <p>Vous pouvez, dès maintenant, commencer à intégrer API Particulier :</p>
        <Link href='https://particulier.api.gouv.fr/tech/'><a>espace développeur</a></Link>
      </div>
    </Section>
  </Page>
)

export default Documentation
