import React from 'react'
import Page from '../components/page'
import Section from '../components/section'

const Contact = () => (
  <Page>
    <Section title='Contactez-nous'>
      <p>Merci de nous envoyer un mail avec les informations suivantes :</p>
      <ul>
        <li>votre collectivité</li>
        <li>votre numéro de téléphone</li>
        <li>une description succincte de votre projet</li>
      </ul>
      <p>
        <a href='mailto:contact@particulier.api.gouv.fr'>contact@particulier.api.gouv.fr</a>
      </p>
    </Section>
  </Page>
)

export default Contact
