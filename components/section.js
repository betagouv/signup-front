import React from 'react'
import PropTypes from 'prop-types'

const Section = ({id, className, title, imageSrc, altText, children}) => (
  <section className={className}>
    <div>
      {title && <h2 id={id} className='section__title'>{title}</h2>}
      {children}
    </div>
    <div>
      <img src={imageSrc} alt={altText} />
    </div>
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
