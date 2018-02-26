import React from 'react'
import PropTypes from 'prop-types'
import TryMeButton from './try-me-button'
import AddToSelectionButton from './add-to-selection-button'

const DataDescription = ({dataset}) => (
  <ul>
    <li>
      <h3>{dataset.name}</h3>
      <p>{dataset.description}</p>
      <TryMeButton url={dataset.url} />
      <AddToSelectionButton />
    </li>
  </ul>
)

DataDescription.propTypes = {
  dataset: PropTypes.object.isRequired
}

export default DataDescription
