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
      <li className='panel'>
        <h2>{enrollment.fournisseur_de_service}</h2>
        <p>{enrollment.description_service}</p>
        <p>État de la demande : {enrollment.state === 'pending' && 'En attente'}</p>

        <div className='button-list'>
          {
            /* <button onClick={this.deleteEnrollment} className='button button-secondary' type='submit' name='delete' id='submit'>Supprimer</button> */
          }
          <button className='button' type='submit' name='subscribe' id='submit'>Voir</button>
        </div>
      </li>
    )
  }
}

Enrollment.propTypes = {
  enrollment: PropTypes.object.isRequired
}

export default Enrollment
