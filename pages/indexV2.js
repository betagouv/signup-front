import React from 'react'
import Page from '../components/page'
import Section from '../components/section'
import ResourceProvider from '../components/resource-provider'
import Services from '../lib/services'

class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      resourceProviders: {
        franceConnect: [],
        apiParticulier: []
      }
    }
  }

  componentDidMount() {
    return Services.getResourceProviderService().then(resourceProviders => {
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

        <Section title='1. Données disponibles par FranceConnect' id='france-connect'>
          <p className='section__subtitle'>
            L’échange de données se fait en mode « ad hoc » entre Fournisseur de Services et Fournisseur de Données. Dans cet échange, FranceConnect tient un rôle de <em>tiers de confiance</em>.<br />
            Il va fournir des jetons d’accès au Fournisseur de Services pour les jeux de données convenus avec les Fournisseurs de Données avec lesquels il échange. Le jeton contenant les jeux de données est transmis au Fournisseur de Services suite au consentement de l’usager.
            <a href='#api-particulier'>Vous n’avez pas encore FranceConnect ?</a>
          </p>

          <div className='container'>
            {
              resourceProviders.franceConnect.map(resourceProvider => {
                return <ResourceProvider key={'resourceProvider-fc' + i++} resourceProvider={resourceProvider} />
              })
            }
          </div>

        </Section>

        <Section title='2. Données disponibles sans FranceConnect' id='api-particulier'>
          <p className='section__subtitle'>L’accès aux données est réalisé au travers de protocoles de communications sécurisés et <em>seuls les opérateurs agréés peuvent se connecter à l’API</em>. <br />
          Pour obtenir un agrément, vous devez justifier d’une simplification pour les citoyens, et vous engager à n’accéder aux données personnelles qu’avec <em>l’accord explicite de l’usager</em>.</p>
          <div className='container'>
            {
              resourceProviders.apiParticulier.map(resourceProvider => {
                return <ResourceProvider key={'resourceProvider-apipart' + i++} resourceProvider={resourceProvider} />
              })
            }
          </div>
        </Section>
      </Page>
    )
  }
}

export default Index
