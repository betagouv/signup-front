import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import './Contact.css';
import TextInput from '../../../atoms/inputs/TextInput';
import EmailInput from '../../../atoms/inputs/EmailInput';
import TelInput from '../../../atoms/inputs/TelInput';
import { withUser } from '../../UserContext';
import Button from '../../../atoms/Button';
import { isValidMobilePhoneNumber, isValidPhoneNumber } from '../../../../lib';

export const Contact = ({
  id,
  heading,
  given_name = '',
  family_name = '',
  email = '',
  phone_number = '',
  job = '',
  display_mobile_phone_label = false,
  disabled,
  onChange,
  user = {},
}) => {
  const namePrefix = useMemo(() => {
    return ['dpo', 'responsable_traitement'].includes(id)
      ? `${id}_`
      : `contacts.${id}.`;
  }, [id]);

  const fillWithUserInformation = useCallback(() => {
    onChange({
      target: { name: `${namePrefix}email`, value: user.email },
    });
    onChange({
      target: { name: `${namePrefix}given_name`, value: user.given_name },
    });
    onChange({
      target: { name: `${namePrefix}family_name`, value: user.family_name },
    });
    onChange({
      target: {
        name: `${namePrefix}phone_number`,
        value: user.phone_number,
      },
    });
    onChange({
      target: { name: `${namePrefix}job`, value: user.job },
    });
  }, [
    onChange,
    user.email,
    user.family_name,
    user.given_name,
    user.job,
    user.phone_number,
    namePrefix,
  ]);

  return (
    <div className="card contact-item">
      <div className="card__content">
        <h3>{heading}</h3>
        {!given_name && !family_name && !email && !phone_number && !job && (
          <div className="form__group">
            <Button outline onClick={fillWithUserInformation}>
              🖐️ c’est moi : remplir avec mes info
            </Button>
          </div>
        )}

        <div className="form-row">
          <div className="form-col">
            <TextInput
              label="Prénom *"
              name={`${namePrefix}given_name`}
              value={given_name}
              disabled={disabled}
              onChange={onChange}
              ariaLabel={`Prénom du ${heading}`}
              required
            />
          </div>
          <div className="form-col">
            <TextInput
              label="Nom *"
              name={`${namePrefix}family_name`}
              value={family_name}
              disabled={disabled}
              onChange={onChange}
              ariaLabel={`Nom du ${heading}`}
              required
            />
          </div>
        </div>
        <TextInput
          label="Poste occupé *"
          name={`${namePrefix}job`}
          value={job}
          disabled={disabled}
          onChange={onChange}
          ariaLabel={`Poste occupé par le ${heading}`}
          required
        />
        <h4>Pour joindre cette personne</h4>
        <EmailInput
          label="Email *"
          name={`${namePrefix}email`}
          value={email}
          disabled={disabled}
          onChange={onChange}
          ariaLabel={`Email du ${heading}`}
          required
        />
        <TelInput
          label={
            display_mobile_phone_label
              ? 'Numéro de téléphone mobile *'
              : 'Numéro de téléphone *'
          }
          name={`${namePrefix}phone_number`}
          value={phone_number}
          disabled={disabled}
          onChange={onChange}
          ariaLabel={`Numéro de téléphone ${
            display_mobile_phone_label ? 'mobile ' : ''
          }du ${heading}`}
          required
        />
        {display_mobile_phone_label &&
          isValidPhoneNumber(phone_number) &&
          !isValidMobilePhoneNumber(phone_number) && (
            <div className="notification error">
              Ce numéro ne correspond pas à un numéro de téléphone mobile
            </div>
          )}
      </div>
    </div>
  );
};

Contact.propTypes = {
  id: PropTypes.string,
  heading: PropTypes.string,
  link: PropTypes.string,
  nom: PropTypes.string,
  email: PropTypes.string,
  emailPlaceholder: PropTypes.string,
  phone_number: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default withUser(Contact);
