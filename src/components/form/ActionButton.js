import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class ActionButton extends React.Component {
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

  transformAclToActions(acl) {
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
          trigger: this.props.handleSubmitFactory(acl),
        }))
        // [{id: 'send_application', trigger: ..., label: 'Envoyer'}]
        .value()
    );
  }

  render() {
    const actions = this.transformAclToActions(this.props.acl);

    return actions.map(({ cssClass, id, label, trigger }) => (
      <button key={id} className={`button ${cssClass}`} onClick={trigger}>
        {label}
      </button>
    ));
  }
}

ActionButton.propTypes = {
  acl: PropTypes.object.isRequired,
  handleSubmitFactory: PropTypes.func.isRequired,
};

export default ActionButton;
