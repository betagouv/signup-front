import React from 'react'
import PropTypes from 'prop-types'

const Section = ({id, className, title, children}) => (
  <section className={className}>
    {title && <h2 id={id} className='section__title'>{title}</h2>}
    {children}
  </section>
)

Section.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  imageSrc: PropTypes.string,
  altText: PropTypes.string,
  children: PropTypes.node.isRequired
}

Section.defaultProps = {
  className: null,
  title: null,
  imageSrc: null,
  altText: null
}

export default Section
