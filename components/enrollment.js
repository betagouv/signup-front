import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Services from '../lib/services'
import {STATE_HUMAN_NAMES} from './enrollment-table'

class Enrollment extends React.Component {
  constructor(props) {
    super(props)

    this.handleReviewApplicationMessageContentChange = this.handleReviewApplicationMessageContentChange.bind(this)
    this.state = {enrollment: props.enrollment, errors: [], reviewApplicationMessageContent: null}
  }

  deleteEnrollment(event) {
    const token = localStorage.getItem('token')
    const id = event.target.value
    Services.deleteUserEnrollment(token, id)
      .then(response => {
        if (response.status === 204) {
          alert('Demande supprimée avec succès' + response.request.response) // eslint-disable-line no-alert
        } else if (response.status === 404) {
          alert('Formulaire incomplet' + response.request.response) // eslint-disable-line no-alert
        } else if (response.status === 401) {
          alert('Vous n êtes pas autorisé' + response) // eslint-disable-line no-alert
        } else {
          alert('Erreur inconnue' + response) // eslint-disable-line no-alert
        }
      })
      .catch(error => alert('Oups !' + error)) // eslint-disable-line no-alert
    event.preventDefault()
  }

  trigger(action) {
    const {enrollment, reviewApplicationMessageContent} = this.state
    enrollment.messages_attributes = [{content: reviewApplicationMessageContent}] // eslint-disable-line camelcase
    return () => Services.triggerUserEnrollment(action, enrollment).then(response => {
      const enrollment = response.data
      if (enrollment) {
        this.setState({enrollment, errors: []})
      }
    }).catch(error => {
      if (error.response.status === 422) {
        let errors = []
        let enrollmentError
        for (enrollmentError in error.response.data) {
          if (Object.prototype.hasOwnProperty.call(error.response.data, enrollmentError)) {
            errors = errors.concat(error.response.data[enrollmentError])
          }
        }
        this.setState({errors})
      }
    })
  }

  handleReviewApplicationMessageContentChange(event) {
    this.setState(Object.assign({}, this.state, {reviewApplicationMessageContent: event.target.value}))
  }

  render() {
    const {enrollment, errors, reviewApplicationMessageContent} = this.state
    enrollment.messages_attributes = enrollment.messages_attributes || [{content: ''}] // eslint-disable-line camelcase

    return (
      <li className='panel'>
        <h2>{enrollment.demarche.intitule}</h2>
        { enrollment.messages.map((message) => {
            return <li className='notification'>{message.content}</li>
          })
        }
        <em>{enrollment.applicant.email}</em>
        <p>{enrollment.description_service}</p>
        <p>État de la demande :&nbsp; {STATE_HUMAN_NAMES[enrollment.state]}</p>
        <p>
          {enrollment.acl.review_application &&
            <input type='text' onChange={this.handleReviewApplicationMessageContentChange} value={reviewApplicationMessageContent} placeholder='Message' />
          }
        </p>
        <div>
          {enrollment.acl.refuse_application &&
            <button className='button' type='submit' name='refuse_application' id='submit' onClick={this.trigger('refuse_application')}>
              Refuser
            </button>
          }
          {enrollment.acl.validate_application &&
            <button className='button' type='submit' name='validate_application' id='submit' onClick={this.trigger('validate_application')}>
              Valider
            </button>
          }
          {enrollment.acl.review_application &&
            <button className='button' type='submit' name='review_application' id='submit' onClick={this.trigger('review_application')}>
              Demande de modifications
            </button>
          }
          {enrollment.acl.send_application &&
            <button className='button' type='submit' name='send_application' id='submit' onClick={this.trigger('send_application')}>
              Envoyer la demande
            </button>
          }
          {enrollment.acl.deploy_application &&
            <button className='button' type='submit' name='deploy_application' id='submit' onClick={this.trigger('deploy_application')}>
              Déployer l&apos;application
            </button>
          }
          {enrollment.acl.send_technical_inputs &&
            <Link href={{pathname: `/${enrollment.fournisseur_de_donnees}.html`, query: {id: enrollment.id}, hash: 'entrants-techniques'}}>
              <button className='button' type='submit' name='send_technical_inputs' id='submit'>
              Demander à entrer en production
              </button>
            </Link>
          }
        </div>

        <div className='button-list'>
          {
            /* <button onClick={this.deleteEnrollment} className='button button-secondary' type='submit' name='delete' id='submit'>Supprimer</button> */
          }
          <Link href={{pathname: `/${enrollment.fournisseur_de_donnees}.html`, query: {id: enrollment.id}}}>
            <a className='button' name='subscribe'>
              Voir
            </a>
          </Link>

        </div>

        {errors.map(error => {
          let i
          return (
            <div key={i++} className='notification error'>
              {error}
            </div>
          )
        })}
      </li>
    )
  }
}

Enrollment.propTypes = {
  enrollment: PropTypes.object.isRequired
}

export default Enrollment
