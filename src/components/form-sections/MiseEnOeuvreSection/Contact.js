import React from 'react';
import PropTypes from 'prop-types';

export const Contact = ({
  id,
  heading,
  description,
  email,
  phone_number,
  display_mobile_phone_label = false,
  disabled,
  handleChange,
}) => (
  <div className="card">
    <div className="card__content">
      <h3>{heading}</h3>
      <div className="form__group">
        <div className="text-quote">{description()}</div>
      </div>
      <div className="form__group">
        <label htmlFor={`person_${id}_email`}>Email</label>
        <input
          type="email"
          onChange={handleChange}
          name={`contacts.${id}.email`}
          id={`person_${id}_email`}
          readOnly={disabled}
          value={email}
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
  phone_number: PropTypes.string,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
};

export default Contact;
