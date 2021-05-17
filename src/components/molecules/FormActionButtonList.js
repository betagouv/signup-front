import _ from 'lodash';
import FormActionButton from '../atoms/FormActionButton';
import DoneIcon from '../atoms/icons/done';

const actionToDisplayInfo = {
  notify: {
    label: 'Envoyer un message',
    cssClass: 'secondary',
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
  },
  refuse_application: {
    label: 'Refuser',
    cssClass: 'warning',
  },
  review_application: {
    label: 'Demander une modification',
    cssClass: 'secondary',
  },
  validate_application: {
    label: 'Valider',
    cssClass: 'primary',
  },
};

const transformAclToButtonsParams = (acl, formSubmitHandlerFactory) =>
  // acl = {'send_application': true, 'review_application': false, 'create': true}
  _(actionToDisplayInfo)
    .pickBy((value, key) => acl[key])
    // {'send_application': {label: ..., cssClass: ...}}
    .keys()
    // ['send_application']
    .map(action => ({
      id: action,
      label: actionToDisplayInfo[action].label,
      icon: actionToDisplayInfo[action].icon,
      cssClass: actionToDisplayInfo[action].cssClass,
      trigger: formSubmitHandlerFactory(action),
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
  setShowPrompt,
  enrollment,
  updateEnrollment,
}) => {
  const buttonsParams = transformAclToButtonsParams(enrollment.acl, action =>
    formSubmitHandlerFactory(
      action,
      setLoading,
      setShowPrompt,
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
          loading={loading}
          intendedAction={intendedAction}
        />
      ))}
    </div>
  );
};

export default FormActionButtonList;
