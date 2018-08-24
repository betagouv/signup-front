import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  createOrUpdateUserEnrollment,
  triggerUserEnrollment,
} from '../../lib/services';

class ActionButtons extends React.Component {
  aclToDisplayInfo = {
    send_application: {
      label: 'Soumettre la demande',
      cssClass: 'primary',
    },
    validate_application: {
      label: 'Valider',
      cssClass: 'primary',
    },
    review_application: {
      label: 'Demander une modification',
      cssClass: 'secondary',
    },
    refuse_application: {
      label: 'Refuser',
      cssClass: 'warning',
    },
    deploy_application: {
      label: 'Déployer',
      cssClass: 'primary',
    },
    send_technical_inputs: {
      label: 'Envoyer les entrants techniques',
      cssClass: 'primary',
    },
  };

  transformAclToActions = acl => {
    return (
      _(acl)
        // {'send_application': true, 'deploy_application': false, 'create': true}
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

  triggerAction = action => {
    if (['review_application', 'refuse_application'].includes(action)) {
      const promptMessage = {
        review_application:
          'Précisez au demandeur les modifications à apporter à sa demande :',
        refuse_application: 'Précisez au demandeur le motif de votre refus :',
      }[action];
      const message = window.prompt(promptMessage); // eslint-disable-line no-alert

      if (!message) {
        // do not trigger action if no message is provided or when clicking on cancel
        return Promise.resolve();
      }

      return triggerUserEnrollment({
        action,
        id: this.props.enrollment.id,
        message,
      });
    }

    if (this.props.enrollment.acl.update) {
      return createOrUpdateUserEnrollment({
        enrollment: this.props.enrollment,
      }).then(enrollment => {
        this.props.updateEnrollment(enrollment);

        return triggerUserEnrollment({ action, id: enrollment.id });
      });
    }

    return triggerUserEnrollment({ action, id: this.props.enrollment.id });
  };

  handleSubmitFactory = action => {
    return event => {
      event.preventDefault();

      this.triggerAction(action)
        .then(() => this.props.handleSubmit())
        .catch(errors => this.props.handleSubmit({ errors }));
    };
  };

  handleSaveDraft = event => {
    event.preventDefault();

    createOrUpdateUserEnrollment({ enrollment: this.props.enrollment })
      .then(() => this.props.handleSubmit())
      .catch(errors => this.props.handleSubmit({ errors }));
  };

  render() {
    const { acl } = this.props.enrollment;
    const actions = this.transformAclToActions(acl);

    return (
      <React.Fragment>
        <div className="button-list">
          {acl.update && (
            <button className="button secondary" onClick={this.handleSaveDraft}>
              Enregistrer le brouillon
            </button>
          )}

          {actions.map(({ cssClass, id, label, trigger }) => (
            <button key={id} className={`button ${cssClass}`} onClick={trigger}>
              {label}
            </button>
          ))}
        </div>
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
