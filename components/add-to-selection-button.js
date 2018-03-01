import React from 'react'
import PropTypes from 'prop-types'

const AddToSelectionButton = ({buttonKey}) => (
  <button className='button' type='submit' name={buttonKey + '_button'} id={buttonKey + '_submit_button'}>Ajouter à ma sélection</button>
)

AddToSelectionButton.propTypes = {
  buttonKey: PropTypes.string.isRequired
}

export default AddToSelectionButton
