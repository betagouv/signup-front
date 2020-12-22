import React from 'react';
import PropTypes from 'prop-types';

import './Contact.css';
import TextInput from '../../Form/components/TextInput';
import Quote from '../../Form/components/Quote';
import EmailInput from '../../Form/components/EmailInput';
import TelInput from '../../Form/components/TelInput';

export const Contact = ({
  id,
  heading,
  description,
  given_name,
  family_name,
  EmailDescription = () => null,
  email,
  emailPlaceholder = '',
  phone_number,
  display_mobile_phone_label = false,
  disabled,
  onChange,
}) => (
  <div className="card">
    <div className="card__content">
      <h3>{heading}</h3>
      {description && <Quote>{description}</Quote>}
      {typeof given_name !== 'undefined' && typeof family_name !== 'undefined' && (
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
              label="Nom de famille"
              name={`contacts.${id}.family_name`}
              value={family_name}
              disabled={disabled}
              onChange={onChange}
              ariaLabel={`Nom de famille du ${heading}`}
            />
          </div>
        </div>
      )}
      <EmailDescription />
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
    </div>
  </div>
);

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

export default Contact;
