import Loader from './Loader';

const FormActionButton = ({
  id,
  cssClass,
  trigger,
  loading,
  icon,
  label,
  intendedAction,
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
      {loading && intendedAction === id && <Loader small />}
    </div>
  </button>
);

export default FormActionButton;
