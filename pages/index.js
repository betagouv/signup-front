import React from 'react'
import Link from 'next/link'
import Page from '../components/page'
import Section from '../components/section'
import Search from '../components/search'
import DataDescription from '../components/data-description'
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
          <DataDescription dataset={DGFIP_DATA_SET.availables_data_sets[0]} />
          <DataDescription dataset={DGFIP_DATA_SET.availables_data_sets[1]} />
        </div>
        <div className='col-md-6'>
          <h2>{CAF_DATA_SET.fournisseur_long_name}</h2>
          <DataDescription dataset={CAF_DATA_SET.availables_data_sets[0]} />
          <DataDescription dataset={CAF_DATA_SET.availables_data_sets[1]} />
          <DataDescription dataset={CAF_DATA_SET.availables_data_sets[2]} />
        </div>
      </div>
    </Section>
  </Page>
)

export default Index
