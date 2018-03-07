import React from 'react'
import PropTypes from 'prop-types'

const Services = ({lists}) => (
  <div className="form__group">
    <label>Qui utilise ces données ?</label>
    <ul className="tag-list">
      {
        lists.map(service => (
          <li className='tag' key={service.name}><a href={service.logo_url}>{service.name}</a></li>
        ))
      }
    </ul>
  </div>
)

Services.propTypes = {
  lists: PropTypes.array.isRequired
}

export default Services
