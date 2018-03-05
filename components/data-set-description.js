import React from 'react'
import PropTypes from 'prop-types'
import TryMeButton from './try-me-button'
import AddToSelectionButton from './add-to-selection-button'
import Services from './services'

const DataSetDescription = ({dataset, provider}) => (
  <div className='dataset-description'>
    <h3 className='grey'>{dataset.name}</h3>
    <p className='tag-darker-grey'>{provider}</p>
    <p>{dataset.description}</p>
    <h4>Qui utilise ces données ?</h4>
    <Services lists={dataset.services} />
    <TryMeButton url={dataset.url} />
    <AddToSelectionButton buttonKey={dataset.key} />
  </div>
)

DataSetDescription.propTypes = {
  dataset: PropTypes.object.isRequired,
  provider: PropTypes.string.isRequired
}

export default DataSetDescription
