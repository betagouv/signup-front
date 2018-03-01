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
      <h1 className='hero__white-background'>API Particulier</h1>
      <h3 className='hero__white-background'>Simplifiez les démarches de vos usagers, ne demandez plus de justificatifs</h3>
    </div>
    <Search />
    <h1 className='hero__container'>Catalogue des données fournies par API Particulier</h1>
    <Section title={DGFIP_DATA_SET.provider_long_name}>
      <DataSet data={DGFIP_DATA_SET} />
    </Section>
    <Section title={CAF_DATA_SET.provider_long_name}>
      <DataSet data={CAF_DATA_SET} />
    </Section>
  </Page>
)

export default Index
