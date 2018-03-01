import React from 'react'
import PropTypes from 'prop-types'

const Services = ({lists}) => (
  lists.map(service => (
    <div key={service.name} className='container'>
      <div>
        <ul className='services'>
          <li className='service'><img className='service-image' src={service.logo_url} alt={service.name + ' logo'} /></li>
        </ul>
      </div>
    </div>
  ))
)

Services.propTypes = {
  lists: PropTypes.array.isRequired
}

export default Services
