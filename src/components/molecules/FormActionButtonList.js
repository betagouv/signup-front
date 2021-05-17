import _ from 'lodash';
import { useState } from 'react';
import { userInteractionsConfiguration } from '../../lib/enrollment-buttons-configuration';
import FormActionButton from '../atoms/FormActionButton';

export const transformAclToButtonsParams = acl =>
  Object.keys(acl)
    .filter(key => acl[key])
    .filter(key => Object.keys(userInteractionsConfiguration).includes(key))
    .map(key => ({ id: key, ...userInteractionsConfiguration[key] }));

const FormActionButtonList = props => {
  const { enrollment } = props;
  const [loading, setLoading] = useState(false);

  const buttonsParams = transformAclToButtonsParams(enrollment.acl);
  return (
    <div className="button-list action">
      {buttonsParams.map(actionConfiguration => (
        <FormActionButton
          key={actionConfiguration.id}
          actionConfiguration={actionConfiguration}
          loading={loading}
          setLoading={setLoading}
          {...props}
        />
      ))}
    </div>
  );
};

export default FormActionButtonList;
