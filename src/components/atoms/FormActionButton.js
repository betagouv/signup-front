import { triggerAction } from '../templates/Form/SubmissionPanel/trigger-action';
import Loader from './Loader';

const FormActionButton = ({
  actionConfiguration,
  loading,
  setLoading,
  pendingAction,
  setPendingAction,
  confirmPrompt,
  cancelPrompt,
  enrollment,
  updateEnrollment,
  handleSubmit,
}) => {
  const { label, icon, cssClass } = actionConfiguration;

  const trigger = async event => {
    event.preventDefault();
    setLoading(true);

    const userInteractionPromise = new Promise((resolve, reject) => {
      confirmPrompt.current = resolve;
      cancelPrompt.current = reject;
    });
    const resultMessages = await triggerAction(
      actionConfiguration,
      setPendingAction,
      enrollment,
      userInteractionPromise,
      updateEnrollment
    );

    setLoading(false);
    handleSubmit(resultMessages);
  };

  return (
    <button
      key={actionConfiguration.id}
      className={`button large enrollment ${cssClass}`}
      onClick={trigger}
      disabled={loading}
    >
      <div className="button-icon">{icon}</div>
      <div>
        {label}
        {loading && pendingAction === actionConfiguration.id && (
          <Loader small />
        )}
      </div>
    </button>
  );
};

export default FormActionButton;
