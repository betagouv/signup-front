import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const LinkButton = ({url, text}) => (
  <Link href={url}><a className='button'>{text}</a></Link>
)

LinkButton.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default LinkButton
