import React from 'react'
import Page from '../components/page'
import Section from '../components/section'
import Search from '../components/search'
import DataSet from '../components/data-set'
import DGFIP_DATA_SET from '../mock/data/dgfip'
import CAF_DATA_SET from '../mock/data/caf'

const Index = () => (
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

    <Section className='section-grey'>
      <div className='container'>
        <h2 className='section__title'>Données issues de la <abbr title={DGFIP_DATA_SET.provider_long_name}>{DGFIP_DATA_SET.provider_short_name}</abbr></h2>
        <DataSet data={DGFIP_DATA_SET} />
      </div>
    </Section>

    <Section className='section-grey'>
      <div className='container'>
        <h2 className='section__title'>Données issues de la <abbr title={CAF_DATA_SET.provider_long_name}>{CAF_DATA_SET.provider_short_name}</abbr></h2>
        <DataSet data={CAF_DATA_SET} />
      </div>
    </Section>
  </Page>
)

export default Index
