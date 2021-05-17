import { useState } from 'react';
import { userInteractionsConfiguration } from '../../lib/enrollment-buttons-configuration';
import FormActionButton from '../atoms/FormActionButton';

export const listAuthorizedActions = acl =>
  Object.keys(userInteractionsConfiguration).filter(key => acl[key]);

const FormActionButtonList = props => {
  const { enrollment } = props;
  const [loading, setLoading] = useState(false);

  const authorizedActions = listAuthorizedActions(enrollment.acl);
  return (
    <div className="button-list action">
      {authorizedActions.map(action => {
        const actionConfiguration = {
          id: action,
          ...userInteractionsConfiguration[action],
        };
        return (
          <FormActionButton
            key={actionConfiguration.id}
            actionConfiguration={actionConfiguration}
            loading={loading}
            setLoading={setLoading}
            {...props}
          />
        );
      })}
    </div>
  );
};

export default FormActionButtonList;
