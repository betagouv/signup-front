import React from 'react'
import Page from '../components/page'
import Section from '../components/section'
import Search from '../components/search'
import ResourceProvider from '../components/resource-provider'
import ResourceProviderService from '../lib/resource-provider.service'

class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      resourceProviders: []
    }
    this.resourceProviderService = new ResourceProviderService()
  }

  componentDidMount() {
    this.resourceProviderService.getAll().then(resourceProviders => {
      this.setState({resourceProviders})
    })
  }

  render() {
    const {resourceProviders} = this.state

    let i = 0
    return (
      <Page>
        <div className='hero__container'>
          <h1 className='hero__white-background'>particulier.api.gouv.fr</h1>
          <p className='hero__white-background'>Pour accélérer l’ouverture des données personnelles et leur réutilisation, automatisez vos demandes de pièces justificatives</p>

          <style jsx>{`
            div {
              background: #45adc5;
              background: linear-gradient(-20deg,#a4cfcd 0%,#45adc5 25%,#265c9f);
            }

            .hero__container {
              padding-top: 5em;
              padding-bottom: 5em;
            }
          `}</style>
        </div>

        <Section className='section-dark'>
          <div className='container'>
              <div className='row'>
                <div className='column'>
                  <h2 class="text-center">Données à jour</h2>
                  <p>Les données servies sont fournies directement par les organismes de référence.</p>
                </div>
                <div className='column'>
                  <h2 class="text-center">FranceConnect</h2>
                  <p>Les échanges de données et le receuil de consentement de l'usager s’appuient sur la technologie FranceConnect.</p>
                  <a href="#france-connect">En savoir plus</a>
                </div>
                <div className='column'>
                  <h2 class="text-center">API Particulier</h2>
                  <p>Votre organisme n'a pas encore implémenté FranceConnect ? Vous pouvez commencer à sécuriser vos échanges  en utilisant les données issues de API particulier.</p>
                  <a href="#api-particulier">En savoir plus</a>
                </div>
              </div>
            </div>
        </Section>

        <Section title="Données disponibles par FranceConnect" id="france-connect">
          {
            resourceProviders.map(resourceProvider => {
              return <ResourceProvider key={'resourceProvider-fc' + i++} resourceProvider={resourceProvider} />
            })
          }
        </Section>

        <Section title="Données disponibles sans FranceConnect" id="api-particulier">
          {
            resourceProviders.map(resourceProvider => {
              return <ResourceProvider key={'resourceProvider-apipart' + i++} resourceProvider={resourceProvider} />
            })
          }
        </Section>


      </Page>
    )
  }
}

export default Index
