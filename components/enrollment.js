import React from 'react'
import PropTypes from 'prop-types'
import Section from '../components/section'

class Enrollment extends React.Component {
  render() {
    const {enrollment} = this.props
    // let i = 0

    console.log('enrollment ---- ', enrollment);

    return (
      <div className='container'>
        <h2>Demande pour {enrollment.fournisseur_de_service}</h2>
        <p>{enrollment.description_service}</p>
        <ul>
          <li>Etat de la demande : {enrollment.state}</li>
        </ul>
      </div>
    )
  }
}

Enrollment.propTypes = {
  enrollment: PropTypes.object.isRequired
}

export default Enrollment
