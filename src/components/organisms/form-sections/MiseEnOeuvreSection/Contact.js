import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import './Contact.css';
import TextInput from '../../../atoms/inputs/TextInput';
import EmailInput from '../../../atoms/inputs/EmailInput';
import TelInput from '../../../atoms/inputs/TelInput';
import { withUser } from '../../UserContext';
import FrontHandIcon from '../../../atoms/icons/front-hand';

export const Contact = ({
  id,
  heading,
  description,
  given_name,
  family_name,
  emailDescription,
  email,
  emailPlaceholder = '',
  phone_number,
  job,
  display_mobile_phone_label = false,
  disabled,
  onChange,
  user = {},
}) => {
  const fillWithUserInformation = useCallback(() => {
    onChange({
      target: { name: `contacts.${id}.email`, value: user.email },
    });
    if (
      typeof given_name !== 'undefined' &&
      typeof family_name !== 'undefined'
    ) {
      onChange({
        target: { name: `contacts.${id}.given_name`, value: user.given_name },
      });
      onChange({
        target: { name: `contacts.${id}.family_name`, value: user.family_name },
      });
    }
    if (typeof phone_number !== 'undefined') {
      onChange({
        target: {
          name: `contacts.${id}.phone_number`,
          value: user.phone_number,
        },
      });
    }
    if (typeof job !== 'undefined') {
      onChange({
        target: { name: `contacts.${id}.job`, value: user.job },
      });
    }
  }, [
    family_name,
    given_name,
    id,
    job,
    onChange,
    phone_number,
    user.email,
    user.family_name,
    user.given_name,
    user.job,
    user.phone_number,
  ]);

  return (
    <div className="card">
      <div className="card__content">
        <h3>{heading}</h3>
        {description}
        {(typeof given_name === 'undefined' ||
          typeof family_name === 'undefined' ||
          (!given_name && !family_name)) &&
          !email &&
          (typeof phone_number === 'undefined' || !phone_number) &&
          (typeof job === 'undefined' || !job) && (
            <div className="form__group">
              <button
                className="fr-btn fr-btn--sm fr-btn--secondary"
                onClick={fillWithUserInformation}
              >
                <div className="button-icon">
                  <FrontHandIcon color="var(--blue)" size={28} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  Je suis {(heading || '').toLowerCase()}.<br />
                  Remplir avec mes informations.
                </div>
              </button>
            </div>
          )}
        {typeof given_name !== 'undefined' &&
          typeof family_name !== 'undefined' && (
            <div className="form-row">
              <div className="form-col">
                <TextInput
                  label="Prénom"
                  name={`contacts.${id}.given_name`}
                  value={given_name}
                  disabled={disabled}
                  onChange={onChange}
                  ariaLabel={`Prénom du ${heading}`}
                />
              </div>
              <div className="form-col">
                <TextInput
                  label="Nom"
                  name={`contacts.${id}.family_name`}
                  value={family_name}
                  disabled={disabled}
                  onChange={onChange}
                  ariaLabel={`Nom du ${heading}`}
                />
              </div>
            </div>
          )}
        {emailDescription}
        <EmailInput
          label="Email"
          placeholder={emailPlaceholder}
          name={`contacts.${id}.email`}
          value={email}
          disabled={disabled}
          onChange={onChange}
          ariaLabel={`Email du ${heading}`}
        />
        {typeof phone_number !== 'undefined' && (
          <TelInput
            label={
              display_mobile_phone_label
                ? 'Numéro de téléphone mobile'
                : 'Numéro de téléphone'
            }
            name={`contacts.${id}.phone_number`}
            value={phone_number}
            disabled={disabled}
            onChange={onChange}
            ariaLabel={`Numéro de téléphone ${
              display_mobile_phone_label ? 'mobile ' : ''
            }du ${heading}`}
          />
        )}
        {typeof job !== 'undefined' && (
          <TextInput
            label="Intitulé de poste"
            name={`contacts.${id}.job`}
            value={job}
            disabled={disabled}
            onChange={onChange}
            ariaLabel={`Intitulé de poste du ${heading}`}
          />
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
