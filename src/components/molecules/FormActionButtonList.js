import _ from 'lodash';
import FormActionButton from '../atoms/FormActionButton';
import DoneIcon from '../atoms/icons/done';

const userInteractionsConfiguration = {
  notify: {
    label: 'Envoyer un message',
    cssClass: 'secondary',
    needsToComputeNextEnrollmentState: true,
    promptForComment: true,
  },
  delete: {
    label: 'Supprimer la demande',
    cssClass: 'warning',
  },
  update: {
    label: 'Sauvegarder le brouillon',
    cssClass: 'secondary',
  },
  send_application: {
    label: 'Soumettre la demande',
    icon: <DoneIcon color="white" />,
    cssClass: 'primary',
    needsToComputeNextEnrollmentState: true,
  },
  refuse_application: {
    label: 'Refuser',
    cssClass: 'warning',
    needsToComputeNextEnrollmentState: true,
    promptForComment: true,
  },
  review_application: {
    label: 'Demander une modification',
    cssClass: 'secondary',
    needsToComputeNextEnrollmentState: true,
    promptForComment: true,
  },
  validate_application: {
    label: 'Valider',
    cssClass: 'primary',
    needsToComputeNextEnrollmentState: true,
    promptForComment: true,
  },
};

const transformAclToButtonsParams = (acl, formSubmitHandlerFactory) =>
  // acl = {'send_application': true, 'review_application': false, 'create': true}
  _(userInteractionsConfiguration)
    .pickBy((value, key) => acl[key])
    // {'send_application': {label: ..., cssClass: ...}}
    .keys()
    // ['send_application']
    .map(action => ({
      id: action,
      ...userInteractionsConfiguration[action],
      trigger: formSubmitHandlerFactory(
        action,
        userInteractionsConfiguration[action]
      ),
    }))
    // [{id: 'send_application', trigger: ..., label: 'Envoyer'}]
    .value();

const FormActionButtonList = ({
  formSubmitHandlerFactory,
  loading,
  intendedAction,
  setLoading,
  setIntendedAction,
  handleSubmit,
  enrollment,
  updateEnrollment,
}) => {
  const buttonsParams = transformAclToButtonsParams(
    enrollment.acl,
    (action, actionConfiguration) =>
      formSubmitHandlerFactory(
        action,
        actionConfiguration,
        setLoading,
        setIntendedAction,
        handleSubmit,
        enrollment,
        updateEnrollment
      )
  );
  return (
    <div className="button-list action">
      {buttonsParams.map(props => (
        <FormActionButton
          {...props}
          key={props.id}
          loading={loading}
          intendedAction={intendedAction}
        />
      ))}
    </div>
  );
};

export default FormActionButtonList;
