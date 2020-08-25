import React from 'react';
import PropTypes from 'prop-types';
import './Prompt.css';
import { getMostUsedComments } from '../../lib/services';
import { TARGET_API_LABELS } from '../../lib/api';
import UnfoldMoreIcon from '../icons/unfold-more';
import UnfoldLessIcon from '../icons/unfold-less';

const actionToEventName = {
  notify: 'notified',
  review_application: 'asked_for_modification',
  refuse_application: 'refused',
  validate_application: 'validated',
};

class Prompt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      selectedTemplateIndex: '',
      templates: [],
      showTemplates: false,
    };
  }

  async componentDidMount() {
    const comments = await getMostUsedComments({
      eventName: actionToEventName[this.props.selectedAction],
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

  toggleShowTemplates = () => {
    this.setState({ showTemplates: !this.state.showTemplates });
  };

  render() {
    const {
      acceptCssClass,
      acceptLabel,
      selectedAction,
      targetApi,
    } = this.props;
    const {
      input,
      templates,
      selectedTemplateIndex,
      showTemplates,
    } = this.state;

    const promptMessage = {
      notify: 'Votre message\xa0:',
      review_application:
        'Précisez au demandeur les modifications à apporter à sa demande\xa0:',
      refuse_application: 'Précisez au demandeur le motif de votre refus\xa0:',
      validate_application:
        'Vous pouvez ajouter un commentaire (optionnel)\xa0:',
    }[selectedAction];

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
    }[selectedAction];

    const teamName = TARGET_API_LABELS[targetApi];

    const mailFirstSection = `Bonjour,

${emailContent}`;

    const mailLastSection = `Pour consulter cette demande, cliquer sur le lien suivant ${
      window.location.href.split('#')[0]
    } .

L'équipe ${teamName}
`;

    return (
      <div className="panel">
        <button
          title={
            showTemplates
              ? "Cacher l'aperçu"
              : "Voir un aperçu de l'email qui sera envoyé"
          }
          aria-label={
            showTemplates
              ? "Cacher l'aperçu"
              : "Voir un aperçu de l'email qui sera envoyé"
          }
          className="light inline-icon-button toggle-comment-button"
          onClick={this.toggleShowTemplates}
        >
          {showTemplates ? (
            <UnfoldLessIcon color="var(--grey)" />
          ) : (
            <UnfoldMoreIcon color="var(--grey)" />
          )}
        </button>
        <label htmlFor="comment">{promptMessage}</label>
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
        <div
          className={`mail-section ${
            showTemplates ? 'mail-section-opened' : ''
          }`}
        >
          <div className="mail-section-content">{mailFirstSection}</div>
        </div>
        <textarea
          id="comment"
          cols="80"
          rows="5"
          value={input}
          onChange={this.handleInputChange}
        />
        <div
          className={`mail-section ${
            showTemplates ? 'mail-section-opened' : ''
          }`}
        >
          <div className="mail-section-content">{mailLastSection}</div>
        </div>
        <div className="button-list action">
          <button
            className="button-outline large secondary"
            onClick={this.handleCancel}
          >
            Annuler
          </button>
          <button
            className={`button large ${acceptCssClass}`}
            onClick={this.handleAccept}
          >
            {acceptLabel}
          </button>
        </div>
      </div>
    );
  }
}

Prompt.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  acceptCssClass: PropTypes.string.isRequired,
  acceptLabel: PropTypes.string.isRequired,
  selectedAction: PropTypes.string.isRequired,
  targetApi: PropTypes.string.isRequired,
};

export default Prompt;
