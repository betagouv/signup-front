import React from 'react'
import Link from 'next/link'
import Page from '../components/page'

const Documentation = () => (
  <Page>
    <div className='hero__container'>
      <h1 className='hero__white-background'>Documentation technique</h1>
      <p>Vous pouvez, dès maintenant, commencer à intégrer API Particulier :</p>
      <Link href='https://particulier.api.gouv.fr/tech/'><a>espace développeur</a></Link>
    </div>
  </Page>
)

export default Documentation
