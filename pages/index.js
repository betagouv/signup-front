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
          <h1 className='hero__white-background'>Accélérer l’ouverture des données personnelles et leur réutilisation </h1>
          <p className='hero__white-background'>Automatisez vos demandes de pièces justificatives pour simplifier vos démarches</p>

          <style jsx>{`
            div {
              background: #45adc5;
              background: linear-gradient(90deg,#a4cfcd 0%,#45adc5 25%,#265c9f);
            }

            .hero__container {
              padding-top: 5em;
              padding-bottom: 5em;
            }
          `}</style>
        </div>

        <Section className='section-dark'>
          <Search />
        </Section>

        {
          resourceProviders.map(resourceProvider => {
            return <ResourceProvider key={'resourceProvider' + i++} resourceProvider={resourceProvider} />
          })
        }
      </Page>
    )
  }
}

export default Index
