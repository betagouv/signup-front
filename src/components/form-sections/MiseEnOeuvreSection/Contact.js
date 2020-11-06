import React from 'react';
import PropTypes from 'prop-types';

import './Contact.css';

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
  handleChange,
}) => (
  <div className="card">
    <div className="card__content">
      <h3>{heading}</h3>
      {description && (
        <div className="form__group">
          <div className="text-quote">{description()}</div>
        </div>
      )}
      {typeof given_name !== 'undefined' && typeof family_name !== 'undefined' && (
        <div className="form-row">
          <div className="form-col">
            <label htmlFor={`person_${id}_given_name`}>Prénom</label>
            <input
              className="form-control"
              type="text"
              onChange={handleChange}
              name={`contacts.${id}.given_name`}
              id={`person_${id}_given_name`}
              readOnly={disabled}
              value={given_name}
              aria-label={`Prénom du ${heading}`}
            />
          </div>
          <div className="form-col">
            <label htmlFor={`person_${id}_family_name`}>Nom de famille</label>
            <input
              className="form-control"
              type="text"
              onChange={handleChange}
              name={`contacts.${id}.family_name`}
              id={`person_${id}_family_name`}
              readOnly={disabled}
              value={family_name}
              aria-label={`Nom de famille du ${heading}`}
            />
          </div>
        </div>
      )}
      <EmailDescription />
      <div className="form__group">
        <label htmlFor={`person_${id}_email`}>Email</label>
        <input
          type="email"
          onChange={handleChange}
          name={`contacts.${id}.email`}
          id={`person_${id}_email`}
          readOnly={disabled}
          value={email}
          placeholder={emailPlaceholder}
          aria-label={`Email du ${heading}`}
        />
      </div>
      {typeof phone_number !== 'undefined' && (
        <div className="form__group">
          <label htmlFor={`person_${id}_phone_number`}>
            {display_mobile_phone_label
              ? 'Numéro de téléphone mobile'
              : 'Numéro de téléphone'}
          </label>
          <input
            type="tel"
            onChange={handleChange}
            name={`contacts.${id}.phone_number`}
            id={`person_${id}_phone_number`}
            readOnly={disabled}
            value={phone_number}
            pattern="\+?(?:[0-9][ -]?){6,14}[0-9]"
            aria-label={`Numéro de téléphone ${
              display_mobile_phone_label ? 'mobile' : ''
            } du ${heading}`}
          />
        </div>
      )}
    </div>
  </div>
);

Contact.propTypes = {
  id: PropTypes.string,
  heading: PropTypes.string,
  link: PropTypes.string,
  description: PropTypes.func,
  nom: PropTypes.string,
  email: PropTypes.string,
  emailPlaceholder: PropTypes.string,
  phone_number: PropTypes.string,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
};

export default Contact;
