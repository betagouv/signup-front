import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const TryMeButton = ({url}) => (
  <Link href={url}><a className='button'>Essayez-moi !</a></Link>
)

TryMeButton.propTypes = {
  url: PropTypes.string.isRequired
}

export default TryMeButton
