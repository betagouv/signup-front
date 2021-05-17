import Button from '../templates/Form/ActionButton/Button';

const FormActionButtonList = ({ buttonsParams, loading, intendedAction }) => {
  return (
    <div className="button-list action">
      {buttonsParams.map(props => (
        <Button {...props} loading={loading} intendedAction={intendedAction} />
      ))}
    </div>
  );
};

export default FormActionButtonList;
