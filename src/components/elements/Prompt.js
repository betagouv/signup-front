import React from 'react';
import PropTypes from 'prop-types';
import { EventItem } from './../form/ActivityFeed';
import './Prompt.css';

export default class Prompt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
    };
  }

  handleInputChange = event => {
    event.preventDefault();

    this.setState({ input: event.target.value });
  };

  handleAccept = event => {
    event.preventDefault();

    this.props.onAccept(this.state.input);
  };

  handleCancel = event => {
    event.preventDefault();

    this.props.onCancel();
  };

  render() {
    const { commentType } = this.props;
    const { input } = this.state;

    const eventName = {
      review_application: 'asked_for_modification',
      refuse_application: 'refused',
      validate_application: 'validated',
    }[commentType];

    const promptMessage = {
      review_application:
        'Précisez au demandeur les modifications à apporter à sa demande\xa0:',
      refuse_application: 'Précisez au demandeur le motif de votre refus\xa0:',
      validate_application:
        'Vous pouvez ajouter un commentaire (optionnel)\xa0:',
    }[commentType];

    // emailContent should be kept synced with back-end email template
    // https://github.com/betagouv/signup-back/tree/master/app/views/enrollment_mailer
    const emailContent = {
      review_application:
        'Votre demande est incomplète et requiert les modifications suivantes :',
      refuse_application:
        'Votre demande a été refusée pour la raison suivante :',
      validate_application:
        'Votre demande a été validée. Votre responsable technique sera contacté très prochainement par e-mail pour obtenir ses accès.',
    }[commentType];

    const mailContent = `Bonjour,

${emailContent}

${input}

Pour consulter cette demande, cliquer sur le lien suivant ${
      window.location.href
    } .

L'équipe FranceConnect
`;

    return (
      <div className="modal__backdrop" id="modal" style={{ display: 'flex' }}>
        <div className="modal comment-action">
          <p>{promptMessage}</p>
          <textarea
            cols="80"
            rows="5"
            value={input}
            onChange={this.handleInputChange}
          />
          <p>Aperçu de l'email qui sera envoyé :</p>
          <textarea cols="80" rows="10" value={mailContent} disabled={true} />
          <p>Aperçu de la notification :</p>
          <hr />
          <EventItem
            email={'example@email.com'}
            updated_at={new Date().toISOString()}
            name={eventName}
            comment={input}
          />
          <hr />
          <div className="form__group button__group">
            <a
              className="button secondary"
              href="#cancel"
              onClick={this.handleCancel}
            >
              Annuler
            </a>
            <a className="button" href="#validate" onClick={this.handleAccept}>
              Valider
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Prompt.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  commentType: PropTypes.string.isRequired,
};
