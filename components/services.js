import React from 'react'
import PropTypes from 'prop-types'

const Services = ({lists}) => (
  lists.map(service => (
    <div key={service.name}>
      <p>{service.name}</p>
      <img src={service.logo_url} alt={service.name + ' logo'} />
    </div>
  ))
)

Services.propTypes = {
  lists: PropTypes.array.isRequired
}

export default Services
