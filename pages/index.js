import React from 'react'
import Page from '../components/page'
import Section from '../components/section'
import Search from '../components/search'
import DataSet from '../components/data-set'
import DGFIP_DATA_SET from '../mock/data/dgfip'
import CAF_DATA_SET from '../mock/data/caf'

const Index = () => (
  <Page>
    <Section className='hero'>
      <div className='hero__container'>
        <h1 className='hero__white-background'>API Particulier</h1>
        <p className='hero__white-background'>Simplifiez les démarches de vos usagers, ne demandez plus de justificatifs</p>
        <Search />
      </div>
    </Section>
    <div>
      <h1 className='hero__white-background'>Catalogue des données fournies par API Particulier</h1>
      <div className='column'>
        <h2 className='hero__white-background'>{DGFIP_DATA_SET.provider_long_name}</h2>
        <div className='row'>
          <DataSet data={DGFIP_DATA_SET} />
        </div>
      </div>
      <div className='column'>
        <h2 className='hero__white-background'>{CAF_DATA_SET.provider_long_name}</h2>
        <div className='row'>
          <DataSet data={CAF_DATA_SET} />
        </div>
      </div>
    </div>
  </Page>
)

export default Index
