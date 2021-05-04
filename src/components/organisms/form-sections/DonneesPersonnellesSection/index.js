import React, { useContext } from 'react';
import RgpdContact from './RgpdContact';
import { ScrollablePanel } from '../../Scrollable';
import { FormContext } from '../../../templates/Form';
import TextInput from '../../../atoms/inputs/TextInput';
import NumberInput from '../../../atoms/inputs/NumberInput';

const DonneesPersonnellesSection = ({ dataRetentionPeriodHelper = '' }) => {
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
    <ScrollablePanel scrollableId="DonneesPersonnellesSection">
      <h2>Le traitement de données à caractère personnel</h2>
      <TextInput
        label="Destinataires des données"
        helper={
          'description du service ou des personnes physiques qui consulteront' +
          ' ces données'
        }
        placeholder={
          '« agents instructeurs des demandes d’aides », « usagers des ' +
          'services publics de la ville », etc.'
        }
        meta={
          <a
            href="https://www.cnil.fr/fr/definition/destinataire"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Voir la définition CNIL du destinataire des données"
          >
            Plus d’infos
          </a>
        }
        name="data_recipients"
        value={data_recipients}
        disabled={disabled}
        onChange={onChange}
      />
      <NumberInput
        label="Durée de conservation des données en mois"
        helper={dataRetentionPeriodHelper}
        name="data_retention_period"
        value={data_retention_period}
        disabled={disabled}
        onChange={onChange}
      />
      {data_retention_period > 36 && (
        <>
          <div className="form__group">
            <div className="notification warning">
              Cette durée excède la durée communément constatée (36 mois).
            </div>
          </div>
          <TextInput
            label="Veuillez justifier cette durée dans le champ ci-après :"
            name="data_retention_comment"
            value={data_retention_comment}
            disabled={disabled}
            onChange={onChange}
          />
        </>
      )}
      <div className="form__group">
        <div className="row">
          <RgpdContact
            type={'responsable_traitement'}
            label={responsable_traitement_label}
            email={responsable_traitement_email}
            phone_number={responsable_traitement_phone_number}
            disabled={disabled}
            onChange={onChange}
          />
          <RgpdContact
            type={'dpo'}
            label={dpo_label}
            email={dpo_email}
            phone_number={dpo_phone_number}
            disabled={disabled}
            onChange={onChange}
          />
        </div>
      </div>
    </ScrollablePanel>
  );
};

export default DonneesPersonnellesSection;
