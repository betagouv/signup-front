import React, { useContext, useEffect } from 'react';
import { findIndex, isEmpty, uniqueId } from 'lodash';
import Contact from './Contact';
import { ScrollablePanel } from '../../Scrollable';
import { FormContext } from '../../../templates/Form';
import ExpandableQuote from '../../../atoms/inputs/ExpandableQuote';

const SECTION_LABEL = 'Les personnes impliquées';
const SECTION_ID = encodeURIComponent(SECTION_LABEL);

export const getDefaultDemandeurDescription = () => (
  <>
    <b>Le demandeur</b>, c'est vous, dépose la demande et sera contacté en cas
    de problème fonctionnel sur votre service.
  </>
);

export const getDefaultResponsableTraitementDescription = () => (
  <>
    <b>Le responsable du traitement des données</b> est la personne physique ou
    morale qui, seule ou conjointement avec d’autres, détermine les finalités et
    les moyens du traitement des données à caractère personnel. Seule une
    personne appartenant à l’organisme demandeur peut être renseignée. Cette
    personne sera notifiée par email à la validation de la demande. Ses nom et
    prénom peuvent également être rendus publics.{' '}
    <a
      href={'https://www.cnil.fr/fr/definition/responsable-de-traitement'}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Voir la définition CNIL du responsable de traitement"
    >
      Plus d’infos
    </a>
    .
  </>
);

export const getDefaultDelegueProtectionDonneesDescription = () => (
  <>
    <b>Le délégué à la protection des données</b> assure que l’organisation
    protège convenablement les données à caractère personnel, conformément à la
    législation en vigueur. C'est généralement une personne appartenant à
    l’organisme demandeur. Cette personne sera notifiée par email à la
    validation de la demande.{' '}
    <a
      href={'https://www.cnil.fr/fr/designation-dpo'}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Voir la définition CNIL du délégué à la protection des données"
    >
      Plus d’infos
    </a>
    .
  </>
);

export const getDefaultResponsableTechniqueDescription = (
  useMobilePhone = false
) => (
  <>
    <b>Le responsable technique</b> recevra les accès techniques par mail
    (attention, ce courrier peut parfois passer en « courriers indésirables »).{' '}
    {useMobilePhone && (
      <>
        Le numéro de téléphone doit être un numéro de téléphone mobile. Il sera
        utilisé pour envoyer un code d’accès.
      </>
    )}{' '}
    Cette personne sera contactée en cas de problème technique sur votre
    service. Le responsable technique peut être le contact technique de votre
    prestataire.
  </>
);

const ÉquipeSection = ({
  initialContacts = {},
  title = 'Les personnes impliquées',
}) => {
  const {
    isUserEnrollmentLoading,
    disabled,
    onChange,
    enrollment: { team_members = [] },
  } = useContext(FormContext);

  const contactConfiguration = {
    ...{
      demandeur: {
        header: 'Demandeur',
        description: getDefaultDemandeurDescription(),
        forceDisable: true,
      },
      responsable_traitement: {
        header: 'Responsable de traitement',
        description: getDefaultResponsableTraitementDescription(),
      },
      delegue_protection_donnees: {
        header: 'Délégué à la protection des données',
        description: getDefaultDelegueProtectionDonneesDescription(),
      },
      technique: {
        header: 'Responsable technique',
        description: getDefaultResponsableTechniqueDescription(),
      },
      ...initialContacts,
    },
  };

  useEffect(() => {
    Object.entries(contactConfiguration).forEach(([type]) => {
      if (
        !isUserEnrollmentLoading &&
        !disabled &&
        !team_members.some(({ type: t }) => t === type)
      ) {
        const id = uniqueId(`tmp_`);
        onChange({
          target: {
            name: 'team_members',
            value: [...team_members, { type, id }],
          },
        });
      }
    });
  });

  if (isEmpty(team_members)) {
    return null;
  }

  return (
    <ScrollablePanel scrollableId={SECTION_ID}>
      <h2>{title}</h2>
      <ExpandableQuote title="Comment renseigner la liste des contacts ?" large>
        {Object.entries(contactConfiguration).map(([type, { description }]) => (
          <p key={type}>{description}</p>
        ))}
      </ExpandableQuote>
      <div className="form__group">
        <div className="contact-list">
          {Object.entries(contactConfiguration).map(
            ([type, { header, forceDisable, displayMobilePhoneLabel }]) =>
              team_members
                .filter(({ type: t }) => t === type)
                .map((team_member) => (
                  <Contact
                    heading={header}
                    key={type}
                    index={findIndex(team_members, ['id', team_member.id])}
                    {...team_member}
                    displayMobilePhoneLabel={displayMobilePhoneLabel}
                    disabled={forceDisable || disabled}
                    onChange={onChange}
                  />
                ))
          )}
        </div>
      </div>
    </ScrollablePanel>
  );
};

ÉquipeSection.sectionLabel = SECTION_LABEL;

export default ÉquipeSection;
