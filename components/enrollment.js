import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

class Enrollment extends React.Component {
  constructor(props) {
    super(props)

    this.handleMessageContentChange = this.handleMessageContentChange.bind(this)
    this.state = {errors: [], messageContent: ''}
  }

  componentDidUpdate(prevProps) {
    if (prevProps.enrollment.demarche.intitule !== this.props.enrollment.demarche.intitule) {
      // React-table does not destroy enrollment cell but re-use it instead
      // Hence, we re-trigger a rendering here to reset this cell state so it can be used for another enrollment
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({errors: [], messageContent: ''})
    }
  }

  handleMessageContentChange(event) {
    this.setState({messageContent: event.target.value})
  }

  trigger(actionName) {
    return () => {
      this.props.triggerAction({...this.props.enrollment, messages_attributes: [{content: this.state.messageContent}]}, actionName)
        .then(() => this.setState({errors: []}))
        .catch(error => {
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
  }

  render() {
    const {errors, messageContent} = this.state
    const {enrollment: {
      id,
      demarche: {intitule},
      messages,
      applicant: {email},
      description_service: descriptionService,
      fournisseur_de_donnees: fournisseurDeDonnees,
      human_state: humanState,
      acl: {
        review_application: canReviewApplication,
        refuse_application: canRefuseApplication,
        validate_application: canValidateApplication,
        send_application: canSendApplication,
        deploy_application: canDeployApplication,
        send_technical_inputs: canSendTechnicalInputs
      }
    }} = this.props

    return (
      <li className='panel'>
        <h2>{intitule}</h2>
        { messages.map(({content}) => <div key={content} className='notification'>{content}</div>) }
        <em>{email}</em>
        <p>{descriptionService}</p>
        <p>État de la demande :&nbsp; {humanState}</p>
        <p>
          {canReviewApplication &&
            <input type='text' onChange={this.handleMessageContentChange} value={messageContent} placeholder='Message' />
          }
        </p>
        <div>
          {canRefuseApplication &&
            <button className='button' type='submit' name='refuse_application' id='submit' onClick={this.trigger('refuse_application')}>
              Refuser
            </button>
          }
          {canValidateApplication &&
            <button className='button' type='submit' name='validate_application' id='submit' onClick={this.trigger('validate_application')}>
              Valider
            </button>
          }
          {canReviewApplication &&
            <button className='button' type='submit' name='review_application' id='submit' onClick={this.trigger('review_application')}>
              Demande de modifications
            </button>
          }
          {canSendApplication &&
            <button className='button' type='submit' name='send_application' id='submit' onClick={this.trigger('send_application')}>
              Envoyer la demande
            </button>
          }
          {canDeployApplication &&
            <button className='button' type='submit' name='deploy_application' id='submit' onClick={this.trigger('deploy_application')}>
              Déployer l&apos;application
            </button>
          }
          {canSendTechnicalInputs &&
            <Link href={{pathname: `/${fournisseurDeDonnees}.html`, query: {id}, hash: 'entrants-techniques'}}>
              <button className='button' type='submit' name='send_technical_inputs' id='submit'>
              Demander à entrer en production
              </button>
            </Link>
          }
        </div>

        <div className='button-list'>
          <Link href={{pathname: `/${fournisseurDeDonnees}.html`, query: {id}}}>
            <a className='button' name='subscribe'>
              Voir
            </a>
          </Link>

        </div>

        {errors.map(error => (
          <div key={error} className='notification error'>
            {error}
          </div>
        ))}
      </li>
    )
  }
}

Enrollment.propTypes = {
  enrollment: PropTypes.object.isRequired,
  triggerAction: PropTypes.func.isRequired
}

export default Enrollment
