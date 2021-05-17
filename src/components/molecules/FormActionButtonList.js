import _ from 'lodash';
import { useState } from 'react';
import { userInteractionsConfiguration } from '../../lib/enrollment-buttons-configuration';
import FormActionButton from '../atoms/FormActionButton';

const transformAclToButtonsParams = acl =>
  // acl = {'send_application': true, 'review_application': false, 'create': true}
  _(userInteractionsConfiguration)
    .pickBy((value, key) => acl[key])
    // {'send_application': {label: ..., cssClass: ...}}
    .keys()
    // ['send_application']
    .map(action => ({
      id: action,
      ...userInteractionsConfiguration[action],
    }))
    // [{id: 'send_application', label: 'Envoyer'}]
    .value();

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
