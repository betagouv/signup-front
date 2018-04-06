import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Services from '../lib/services'

class Enrollment extends React.Component {
  constructor(props) {
    super(props)

    this.state = {enrollment: props.enrollment}
  }
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

  trigger(action, enrollment) {
    return () => Services.triggerUserEnrollment(action, enrollment).then((response) => {
      const enrollment = response.data
      if (enrollment) this.setState({enrollment: enrollment})
    })
  }

  render() {
    const {enrollment} = this.state

    return (
      <li className='panel'>
        <h2>{enrollment.fournisseur_de_service}</h2>
        <em>{enrollment.applicant.email}</em>
        <p>{enrollment.description_service}</p>
        <p>État de la demande :&nbsp;
          {enrollment.state === 'pending' && 'Demande en attente'}
          {enrollment.state === 'sent' && 'Demande envoyée'}
          {enrollment.state === 'validated' && 'Demande validée'}
          {enrollment.state === 'refused' && 'Demande refusée'}
          {enrollment.state === 'technical_inputs' && 'En attente de déploiement'}
          {enrollment.state === 'deployed' && 'Déployé'}
        </p>
        {enrollment.acl.refuse_application &&
          <button className='button' type='submit' name='refuse_application' id='submit' onClick={this.trigger('refuse_application', enrollment)}>
            Refuser
          </button>
        }
        {enrollment.acl.review_application &&
          <button className='button' type='submit' name='review_application' id='submit' onClick={this.trigger('review_application', enrollment)}>
            Demande de modifications
          </button>
        }
        {enrollment.acl.validate_application &&
          <button className='button' type='submit' name='validate_application' id='submit' onClick={this.trigger('validate_application', enrollment)}>
            Valider
          </button>
        }
        {enrollment.acl.send_application &&
          <button className='button' type='submit' name='send_application' id='submit' onClick={this.trigger('send_application', enrollment)}>
            Envoyer la demande
          </button>
        }
        {enrollment.acl.deploy_application &&
          <button className='button' type='submit' name='deploy_application' id='submit' onClick={this.trigger('deploy_application', enrollment)}>
            Déployer l'application
          </button>
        }
        {enrollment.acl.send_technical_inputs &&
          <Link href={{pathname: '/contractualisation-fc', query: {id: enrollment.id}, hash: 'entrants-techniques'}}>
          <button className='button' type='submit' name='send_technical_inputs' id='submit'>
            Demander à entrer en production
          </button>
          </Link>
        }

        <div className='button-list'>
          {
            /* <button onClick={this.deleteEnrollment} className='button button-secondary' type='submit' name='delete' id='submit'>Supprimer</button> */
          }
          <Link href={{pathname: '/contractualisation-fc', query: {id: enrollment.id}}}>
          <button className='button' type='submit' name='subscribe' id='submit'>
            Voir
          </button>
          </Link>
        </div>
      </li>
    )
  }
}

Enrollment.propTypes = {
  enrollment: PropTypes.object.isRequired
}

export default Enrollment
