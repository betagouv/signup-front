import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class ActionButton extends React.Component {
  aclToLabel = {
    send_application: 'Soumettre la demande',
    validate_application: 'Valider',
    review_application: 'Demander une modification',
    refuse_application: 'Refuser',
    deploy_application: 'Déployer',
    send_technical_inputs: 'Envoyer les entrants techniques',
  };

  transformAclToActions(acl) {
    return (
      _(acl)
        // {'send_application': true, 'deploy_application': false, 'create': true}
        .pickBy((value, key) => value && this.aclToLabel[key])
        // {'send_application': true}
        .keys()
        // ['send_application']
        .map(acl => ({
          id: acl,
          label: this.aclToLabel[acl],
          trigger: this.props.handleSubmitFactory(acl),
        }))
        // [{id: 'send_application', trigger: ..., label: 'Envoyer'}]
        .value()
    );
  }

  render() {
    const actions = this.transformAclToActions(this.props.acl);

    return actions.map(({ id, label, trigger }) => (
      <button key={id} className="button" onClick={trigger}>
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
