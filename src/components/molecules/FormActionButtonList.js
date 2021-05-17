import FormActionButton from '../atoms/FormActionButton';

const FormActionButtonList = ({ buttonsParams, loading, intendedAction }) => {
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
