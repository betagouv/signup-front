import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Helper from '../elements/Helper';
import { RgpdContact } from '../form/RgpdContact';
import { ScrollablePanel } from '../elements/Scrollable';
import { FormContext } from '../Form';

const DonneesPersonnellesSection = () => {
  const {
    disabled,
    onChange,
    enrollment: {
      data_recipients = '',
      data_retention_period = '',
      data_retention_comment = '',
      responsable_traitement_label = '',
      responsable_traitement_email = '',
      responsable_traitement_phone_number = '',
      dpo_label = '',
      dpo_email = '',
      dpo_phone_number = '',
    },
  } = useContext(FormContext);

  return (
    <ScrollablePanel scrollableId="donnees-personnelles">
      <h2>Le traitement de données à caractère personnel</h2>

      <div className="form__group">
        <label htmlFor="data_recipients">
          Destinataires des données
          <Helper
            title={
              'description du service ou des personnes physiques qui consulteront ces données'
            }
          />
          <a
            href="https://www.cnil.fr/fr/definition/destinataire"
            target="_blank"
            rel="noopener noreferrer"
          >
            (plus d&acute;infos)
          </a>
        </label>
        <input
          type="text"
          placeholder="« agents instructeurs des demandes d’aides », « usagers des services publics de la ville », etc."
          onChange={onChange}
          name="data_recipients"
          id="data_recipients"
          readOnly={disabled}
          value={data_recipients}
        />
      </div>

      <div className="form__group">
        <label htmlFor="data_retention_period">
          Durée de conservation des données en mois
        </label>
        <input
          type="number"
          min="0"
          max="2147483647"
          onChange={onChange}
          name="data_retention_period"
          id="data_retention_period"
          disabled={disabled}
          value={data_retention_period}
        />
      </div>
      {data_retention_period > 36 && (
        <div className="form__group">
          <label
            htmlFor="data_retention_comment"
            className="notification warning"
          >
            Cette durée excède la durée communément constatée (36 mois).
            Veuillez justifier cette durée dans le champ ci-après:
          </label>
          <textarea
            rows="10"
            onChange={onChange}
            name="data_retention_comment"
            id="data_retention_comment"
            readOnly={disabled}
            value={data_retention_comment}
          />
        </div>
      )}
      <div className="form__group">
        <div className="row">
          <RgpdContact
            type={'responsable_traitement'}
            label={responsable_traitement_label}
            email={responsable_traitement_email}
            phone_number={responsable_traitement_phone_number}
            disabled={disabled}
            handleChange={onChange}
          />
          <RgpdContact
            type={'dpo'}
            label={dpo_label}
            email={dpo_email}
            phone_number={dpo_phone_number}
            disabled={disabled}
            handleChange={onChange}
          />
        </div>
      </div>
    </ScrollablePanel>
  );
};

DonneesPersonnellesSection.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  enrollment: PropTypes.shape({
    data_recipients: PropTypes.string,
    data_retention_period: PropTypes.string,
    data_retention_comment: PropTypes.string,
    responsable_traitement_label: PropTypes.string,
    responsable_traitement_email: PropTypes.string,
    responsable_traitement_phone_number: PropTypes.string,
    dpo_label: PropTypes.string,
    dpo_email: PropTypes.string,
    dpo_phone_number: PropTypes.string,
  }),
};

export default DonneesPersonnellesSection;
