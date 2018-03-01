import React from 'react'
import PropTypes from 'prop-types'
import TryMeButton from './try-me-button'
import AddToSelectionButton from './add-to-selection-button'
import Services from './services'

const DataSetDescription = ({dataset}) => (
  <div>
    <h3>{dataset.name}</h3>
    <p>{dataset.description}</p>
    <h4>Qui utilise ces données ?</h4>
    <Services lists={dataset.services} />
    <TryMeButton url={dataset.url} />
    <AddToSelectionButton buttonKey={dataset.key} />
  </div>
)

DataSetDescription.propTypes = {
  dataset: PropTypes.object.isRequired
}

export default DataSetDescription
