import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Prompt from './Prompt';
import DoneIcon from '../../../atoms/icons/done';
import FormActionButtonList from '../../../molecules/FormActionButtonList';

const actionToDisplayInfo = {
  notify: {
    label: 'Envoyer un message',
    cssClass: 'secondary',
  },
  destroy: {
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

const SubmissionPanel = ({ enrollment, handleSubmit, updateEnrollment }) => {
  const {
    target_api,
    user: { email: ownerEmailAddress } = { email: null },
  } = enrollment;

  const [pendingAction, setPendingAction] = useState(null);

  const showPrompt = pendingAction !== null;

  const confirmPrompt = useRef();
  const cancelPrompt = useRef();

  const onPromptConfirm = (message, fullEditMode) => {
    setPendingAction(null);
    confirmPrompt.current({ message, fullEditMode });
  };
  const onPromptCancel = () => {
    setPendingAction(null);
    cancelPrompt.current();
  };
  return (
    <>
      <FormActionButtonList
        pendingAction={pendingAction}
        enrollment={enrollment}
        setPendingAction={setPendingAction}
        handleSubmit={handleSubmit}
        updateEnrollment={updateEnrollment}
        confirmPrompt={confirmPrompt}
        cancelPrompt={cancelPrompt}
      />

      {showPrompt && (
        <Prompt
          onAccept={onPromptConfirm}
          onCancel={onPromptCancel}
          acceptLabel={actionToDisplayInfo[pendingAction].label}
          acceptCssClass={actionToDisplayInfo[pendingAction].cssClass}
          selectedAction={pendingAction}
          targetApi={target_api}
          ownerEmailAddress={ownerEmailAddress}
        />
      )}
    </>
  );
};

SubmissionPanel.propTypes = {
  enrollment: PropTypes.object.isRequired,
  updateEnrollment: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default SubmissionPanel;
