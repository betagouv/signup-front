import React from 'react'
import PropTypes from 'prop-types'

import Container from '../container'

const Section = ({title, children}) => (
  <section>
    <Container>
      {title && <h2>{title}</h2>}
      {children}
    </Container>
  </section>
)

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired
}

Section.defaultProps = {
  title: null
}

export default Section
