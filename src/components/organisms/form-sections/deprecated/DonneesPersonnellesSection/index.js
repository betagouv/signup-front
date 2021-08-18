import React, { useContext, useEffect } from 'react';
import RgpdContact from './RgpdContact';
import { ScrollablePanel } from '../../../Scrollable';
import { FormContext } from '../../../../templates/Form';
import TextInput from '../../../../atoms/inputs/TextInput';
import NumberInput from '../../../../atoms/inputs/NumberInput';
import _, { findIndex, isEmpty, uniqueId } from 'lodash';

const SECTION_LABEL = 'Données personnelles';
const SECTION_ID = encodeURIComponent(SECTION_LABEL);

const DonneesPersonnellesSection = ({ dataRetentionPeriodHelper = '' }) => {
  const {
    isUserEnrollmentLoading,
    disabled,
    onChange,
    enrollment: {
      data_recipients = '',
      data_retention_period = '',
      data_retention_comment = '',
      team_members = [],
    },
  } = useContext(FormContext);

  useEffect(() => {
    const newTeamMembers = _([
      'responsable_traitement',
      'delegue_protection_donnees',
    ])
      .map((type) => {
        if (team_members.some(({ type: t }) => t === type)) {
          return null;
        }

        const id = uniqueId(`tmp_`);
        return { type, tmp_id: id };
      })
      .compact()
      .value();

    if (!isUserEnrollmentLoading && !disabled && !isEmpty(newTeamMembers)) {
      onChange({
        target: {
          name: 'team_members',
          value: [...team_members, ...newTeamMembers],
        },
      });
    }
  }, [isUserEnrollmentLoading, disabled, onChange, team_members]);

  return (
    <ScrollablePanel scrollableId={SECTION_ID}>
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
          {['responsable_traitement', 'delegue_protection_donnees'].map(
            (type) =>
              team_members
                .filter(({ type: t }) => t === type)
                .map(({ id, tmp_id, family_name, email, phone_number }) => (
                  <RgpdContact
                    key={id || tmp_id}
                    index={findIndex(
                      team_members,
                      ({ id: i, tmp_id: _i }) =>
                        (i && i === id) || (_i && _i === tmp_id)
                    )}
                    type={type}
                    family_name={family_name || ''}
                    email={email || ''}
                    phone_number={phone_number || ''}
                    disabled={disabled}
                    onChange={onChange}
                  />
                ))
          )}
        </div>
      </div>
    </ScrollablePanel>
  );
};

DonneesPersonnellesSection.sectionLabel = SECTION_LABEL;

export default DonneesPersonnellesSection;
