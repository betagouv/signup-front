import React from 'react'
import Head from 'next/head'
import Embed from 'react-runkit'
import PropTypes from 'prop-types'
import TryMeButton from './try-me-button'
import AddToSelectionButton from './add-to-selection-button'
import Services from './services'

const DataSetDescription = ({dataset, provider}) => (
  <div className='panel'>
    <Head>
      <script src='https://embed.runkit.com'></script>
    </Head>
    <div className='panel__header'>
      <h3>{dataset.name}</h3>
      <small className='panel__header-extra'>{provider}</small>
    </div>
    <div>
      <p>{dataset.description}</p>
      <Embed source={ dataset.node_example } />
      <Services lists={dataset.services} />
    </div>

    <div className='panel__actions'>
      <TryMeButton url={dataset.url} />
      <AddToSelectionButton buttonKey={dataset.key} />
    </div>
  </div>
)

DataSetDescription.propTypes = {
  dataset: PropTypes.object.isRequired,
  provider: PropTypes.string.isRequired
}

export default DataSetDescription
