import React from 'react'
import PropTypes from 'prop-types'

import Container from './container'

const Section = ({title, imageSrc, altText, children}) => (
  <section>
    <Container>
      <div>
        {title && <h2>{title}</h2>}
        {children}
      </div>
      <div>
        <img src={imageSrc} alt={altText} />
      </div>
    </Container>
  </section>
)

Section.propTypes = {
  title: PropTypes.string,
  imageSrc: PropTypes.string,
  altText: PropTypes.string,
  children: PropTypes.node.isRequired
}

Section.defaultProps = {
  title: null,
  imageSrc: null,
  altText: null
}

export default Section
