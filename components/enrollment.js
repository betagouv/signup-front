import React from 'react'
import PropTypes from 'prop-types'
import Services from '../lib/services'

class Enrollment extends React.Component {
  deleteEnrollment(event) {
    const token = localStorage.getItem('token')
    const id = event.target.value
    Services.deleteUserEnrollment(token, id)
      .then(response => {
        if (response.status === 204) {
          alert('Demande supprimée avec succès' + response.request.response)
        } else if (response.status === 404) {
          alert('Formulaire incomplet' + response.request.response)
        } else if (response.status === 401) {
          alert("Vous n'êtes pas autorisé" + response)
        } else {
          alert("Erreur inconnue" + response)
        }
      })
      .catch(error => alert("Oups !" + error) )
    event.preventDefault()
  }

  render() {
    const {enrollment} = this.props

    return (
      <div className='container'>
        <h2>Demande pour {enrollment.fournisseur_de_service}</h2>
        <p>{enrollment.description_service}</p>
        <ul>
          <li>Etat de la demande : {enrollment.state}</li>
          <li><button onClick={this.deleteEnrollment} className='button' type='submit' name='subscribe' id='submit' value={enrollment.id}>Supprimer la demande</button></li>
        </ul>
      </div>
    )
  }
}

Enrollment.propTypes = {
  enrollment: PropTypes.object.isRequired
}

export default Enrollment
