import Loader from './Loader';

const FormActionButton = ({
  id,
  cssClass,
  trigger,
  loading,
  icon,
  label,
  pendingAction,
}) => (
  <button
    key={id}
    className={`button large enrollment ${cssClass}`}
    onClick={trigger}
    disabled={loading}
  >
    <div className="button-icon">{icon}</div>
    <div>
      {label}
      {loading && pendingAction === id && <Loader small />}
    </div>
  </button>
);

export default FormActionButton;
