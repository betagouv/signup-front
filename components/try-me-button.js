import React from 'react'
import PropTypes from 'prop-types'

const TryMeButton = ({handleClick}) => (
  <button className='button button-secondary' onClick={handleClick}>Essayez-moi !</button>
)

TryMeButton.propTypes = {
  handleClick: PropTypes.func.isRequired
}

export default TryMeButton
