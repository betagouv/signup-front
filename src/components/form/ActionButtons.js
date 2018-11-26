import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  createOrUpdateEnrollment,
  triggerEnrollment,
  updateEnrollmentContacts,
} from '../../lib/services';
import Prompt from '../Prompt';

const { REACT_APP_API_PARTICULIER_HOST: API_PARTICULIER_HOST } = process.env;

class ActionButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doShowPrompt: false,
      promptMessage: '',
    };
  }

  aclToDisplayInfo = {
    send_application: {
      label: 'Soumettre la demande',
      cssClass: 'primary enrollment',
    },
    validate_application: {
      label: 'Valider',
      cssClass: 'primary enrollment',
    },
    review_application: {
      label: 'Demander une modification',
      cssClass: 'secondary enrollment',
    },
    refuse_application: {
      label: 'Refuser',
      cssClass: 'warning enrollment',
    },
    update_contacts: {
      label: 'Mettre à jour les contacts',
      cssClass: 'primary enrollment',
    },
  };

  transformAclToActions = acl => {
    return (
      _(acl)
        // {'send_application': true, 'review_application': false, 'create': true}
        .pickBy((value, key) => value && this.aclToDisplayInfo[key])
        // {'send_application': true}
        .keys()
        // ['send_application']
        .map(acl => ({
          id: acl,
          label: this.aclToDisplayInfo[acl].label,
          cssClass: this.aclToDisplayInfo[acl].cssClass,
          trigger: this.handleSubmitFactory(acl),
        }))
        // [{id: 'send_application', trigger: ..., label: 'Envoyer'}]
        .value()
    );
  };

  getActionMessage = action => {
    const promptMessage = {
      review_application:
        'Précisez au demandeur les modifications à apporter à sa demande\xa0:',
      refuse_application: 'Précisez au demandeur le motif de votre refus\xa0:',
    }[action];

    this.setState({ doShowPrompt: true, promptMessage });

    return new Promise(resolve => {
      this.resolveActionMessagePromise = resolve;
    });
  };

  submitActionMessage = message => {
    this.resolveActionMessagePromise(message);

    this.setState({ doShowPrompt: false, promptMessage: '' });
  };

  cancelActionMessage = () => {
    this.resolveActionMessagePromise();

    this.setState({ doShowPrompt: false, promptMessage: '' });
  };

  triggerAction = async action => {
    let message = null;

    if (['review_application', 'refuse_application'].includes(action)) {
      message = await this.getActionMessage(action);

      if (!message) {
        // do not trigger action if no message is provided or when clicking on cancel
        return Promise.resolve();
      }
    }

    if (action === 'update_contacts') {
      return await updateEnrollmentContacts({
        enrollment: this.props.enrollment,
      });
    }

    let enrollmentId = this.props.enrollment.id;

    if (this.props.enrollment.acl.update) {
      const newEnrollment = await createOrUpdateEnrollment({
        enrollment: this.props.enrollment,
      });
      this.props.updateEnrollment(newEnrollment);
      enrollmentId = newEnrollment.id;
    }

    return await triggerEnrollment({
      action,
      id: enrollmentId,
      message,
    });
  };

  handleSubmitFactory = action => {
    return event => {
      event.preventDefault();

      this.triggerAction(action)
        .then(() => this.props.handleSubmit({}))
        .catch(errors => this.props.handleSubmit({ errors }));
    };
  };

  handleSaveDraft = event => {
    event.preventDefault();

    createOrUpdateEnrollment({ enrollment: this.props.enrollment })
      .then(() => this.props.handleSubmit({}))
      .catch(errors => this.props.handleSubmit({ errors }));
  };

  render() {
    const { acl, token_id } = this.props.enrollment;
    const actions = this.transformAclToActions(acl);
    const { doShowPrompt, promptMessage } = this.state;

    return (
      <React.Fragment>
        <div className="button-list enrollment">
          {acl.update && (
            <button
              className="button secondary enrollment"
              onClick={this.handleSaveDraft}
            >
              Enregistrer le brouillon
            </button>
          )}

          {token_id && (
            <button className="button secondary enrollment">
              <a href={`${API_PARTICULIER_HOST}/admin/token/${token_id}`}>
                Gérer l'accès à l'API
              </a>
            </button>
          )}

          {actions.map(({ cssClass, id, label, trigger }) => (
            <button key={id} className={`button ${cssClass}`} onClick={trigger}>
              {label}
            </button>
          ))}
        </div>

        {doShowPrompt && (
          <Prompt
            onAccept={this.submitActionMessage}
            onCancel={this.cancelActionMessage}
            promptMessage={promptMessage}
          />
        )}
      </React.Fragment>
    );
  }
}

ActionButtons.propTypes = {
  enrollment: PropTypes.object.isRequired,
  updateEnrollment: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ActionButtons;
