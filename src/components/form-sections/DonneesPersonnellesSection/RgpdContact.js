import React from 'react';
import PropTypes from 'prop-types';
import Helper from '../../Helper';

const descriptions = {
  responsable_traitement: {
    heading: 'Responsable de traitement',
    hint: () => (
      <p>
        Le responsable du traitement des données est la personne physique ou
        morale qui, seul ou conjointement avec d’autres, détermine les finalités
        et les moyens du traitement des données à caractère personnel. Seule une
        personne appartenant à l'organisme demandeur peut être renseignée. (
        <a
          href={'https://www.cnil.fr/fr/definition/responsable-de-traitement'}
          target="_blank"
          rel="noopener noreferrer"
        >
          plus d'info
        </a>
        )
      </p>
    ),
  },
  dpo: {
    heading: 'Délégué à la protection des données',
    hint: () => (
      <p>
        C'est la personne qui s'assure que l'organisation protège convenablement
        les données à caractère personnel, conformément à la législation en
        vigueur. C'est généralement une personne appartenant à l'organisme
        demandeur. (
        <a
          href={'https://www.cnil.fr/fr/designation-dpo'}
          target="_blank"
          rel="noopener noreferrer"
        >
          plus d'info
        </a>
        )
      </p>
    ),
  },
};

const RgpdContact = ({
  type,
  label,
  email,
  phone_number,
  disabled,
  handleChange,
}) => (
  <div className="card">
    <div className="card__content">
      <h3>{descriptions[type].heading}</h3>
      <div className="form__group">
        <div className="text-quote">{descriptions[type].hint()}</div>
      </div>
      <div className="form__group">
        <label htmlFor={`${type}_label`}>Nom et Prénom</label>
        <input
          type="text"
          onChange={handleChange}
          name={`${type}_label`}
          id={`${type}_label`}
          readOnly={disabled}
          value={label}
        />
        {type === 'responsable_traitement' && (
          <small className="card__meta">
            <i>Cette information peut être rendue publique.</i>
          </small>
        )}
      </div>
      <div className="form__group">
        <label htmlFor={`${type}_email`}>Email</label>
        <input
          type="email"
          onChange={handleChange}
          name={`${type}_email`}
          id={`${type}_email`}
          readOnly={disabled}
          value={email}
        />
        <small className="card__meta">
          <i>
            Une notification sera envoyée à cette adresse à la validation de la
            demande
          </i>
        </small>
      </div>
      <div className="form__group">
        <label htmlFor={`${type}_phone_number`}>
          Numéro de téléphone
          <Helper
            title={
              'Ce numéro peut être le numéro du secrétariat ou le numéro direct de ' +
              'la personne concernée. Ce numéro nous permettra de vous contacter ' +
              "lors d'incidents ou difficultés."
            }
          />
        </label>
        <input
          type="tel"
          onChange={handleChange}
          name={`${type}_phone_number`}
          id={`${type}_phone_number`}
          readOnly={disabled}
          value={phone_number}
          pattern="\+?(?:[0-9][ -]?){6,14}[0-9]"
        />
      </div>
    </div>
  </div>
);

RgpdContact.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  email: PropTypes.string,
  phone_number: PropTypes.string,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
};

export default RgpdContact;
