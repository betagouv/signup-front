import React from 'react'
import PropTypes from 'prop-types'

const Section = ({id, className, title, children}) => (
  <section className={className} id={id} >
    {title && <h2 className='section__title'>{title}</h2>}
    {children}
  </section>
)

Section.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  id: PropTypes.string
}

Section.defaultProps = {
  className: null,
  title: null,
  id: null
}

export default Section
