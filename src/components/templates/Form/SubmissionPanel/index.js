import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Prompt from './Prompt';
import FormActionButtonList from '../../../molecules/FormActionButtonList';
import { userInteractionsConfiguration } from '../../../../lib/enrollment-buttons-configuration';

const SubmissionPanel = ({ enrollment, handleSubmit, updateEnrollment }) => {
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
          acceptLabel={userInteractionsConfiguration[pendingAction].label}
          acceptCssClass={userInteractionsConfiguration[pendingAction].cssClass}
          selectedAction={pendingAction}
          enrollment={enrollment}
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
