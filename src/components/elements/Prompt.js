import React from 'react';
import PropTypes from 'prop-types';
import { EventItem } from './../form/ActivityFeed';
import './Prompt.css';
import { getMostUsedComments } from '../../lib/services';
import { TARGET_API_LABELS } from '../../lib/api';

const commentTypeToEventName = {
  notify: 'notified',
  review_application: 'asked_for_modification',
  refuse_application: 'refused',
  validate_application: 'validated',
};

export default class Prompt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      selectedTemplateIndex: '',
      templates: [],
    };
  }

  async componentDidMount() {
    const comments = await getMostUsedComments({
      eventName: commentTypeToEventName[this.props.commentType],
      targetApi: this.props.targetApi,
    });

    this.setState({ templates: comments });
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

  handleTemplateChange = event => {
    event.preventDefault();

    const selectedTemplateIndex = event.target.value;
    const input = this.state.templates[selectedTemplateIndex];

    if (selectedTemplateIndex !== '') {
      this.setState({ selectedTemplateIndex, input });
    }
  };

  render() {
    const { commentType, targetApi } = this.props;
    const { input, templates, selectedTemplateIndex } = this.state;

    const eventName = commentTypeToEventName[commentType];

    const promptMessage = {
      notify: 'Votre message\xa0:',
      review_application:
        'Précisez au demandeur les modifications à apporter à sa demande\xa0:',
      refuse_application: 'Précisez au demandeur le motif de votre refus\xa0:',
      validate_application:
        'Vous pouvez ajouter un commentaire (optionnel)\xa0:',
    }[commentType];

    // emailContent should be kept synced with back-end email template
    // https://github.com/betagouv/signup-back/tree/master/app/views/enrollment_mailer
    const emailContent = {
      notify: 'Vous avez un nouveau message concernant votre demande :',
      review_application:
        'Votre demande est incomplète et requiert les modifications suivantes :',
      refuse_application:
        'Votre demande a été refusée pour la raison suivante :',
      validate_application:
        'Votre demande a été validée. Votre responsable technique sera contacté très prochainement par e-mail pour obtenir ses accès.',
    }[commentType];

    const teamName = TARGET_API_LABELS[targetApi];

    const mailContent = `Bonjour,

${emailContent}

${input}

Pour consulter cette demande, cliquer sur le lien suivant ${
      window.location.href
    } .

L'équipe ${teamName}
`;

    return (
      <div className="modal__backdrop" id="modal" style={{ display: 'flex' }}>
        <div className="modal comment-action">
          <p>{promptMessage}</p>
          {templates.length > 0 && (
            <select
              value={selectedTemplateIndex}
              onChange={this.handleTemplateChange}
            >
              <option value="">Choisir un template</option>
              {templates.map((template, index) => (
                <option key={index} value={index}>
                  {template.substring(0, 100)}
                </option>
              ))}
            </select>
          )}
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
  targetApi: PropTypes.string.isRequired,
};
