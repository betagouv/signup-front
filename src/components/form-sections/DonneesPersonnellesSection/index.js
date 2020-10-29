import React, { useContext } from 'react';
import Helper from '../../Helper';
import RgpdContact from './RgpdContact';
import { ScrollablePanel } from '../../Scrollable';
import { FormContext } from '../../Form';

const DonneesPersonnellesSection = ({ data_retention_period_helper = '' }) => {
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
        <small className="card__meta">
          <i>
            <a
              href="https://www.cnil.fr/fr/definition/destinataire"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Voir la définition CNIL du destinataire des données"
            >
              Plus d’infos
            </a>
          </i>
        </small>
      </div>

      <div className="form__group">
        <label htmlFor="data_retention_period">
          Durée de conservation des données en mois
          {data_retention_period_helper && (
            <Helper title={data_retention_period_helper} />
          )}
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

export default DonneesPersonnellesSection;
