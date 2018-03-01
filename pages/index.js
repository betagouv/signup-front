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
    <Section>
      <h1>Catalogue des données fournies par API Particulier</h1>
      <div className='row'>
        <div className='col-md-6'>
          <h2>{DGFIP_DATA_SET.fournisseur_long_name}</h2>
          <DataSet data={DGFIP_DATA_SET} />
        </div>
        <div className='col-md-6'>
          <h2>{CAF_DATA_SET.fournisseur_long_name}</h2>
          <DataSet data={CAF_DATA_SET} />
        </div>
      </div>
    </Section>
  </Page>
)

export default Index
