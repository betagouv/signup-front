import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import Contact from './Contact';
import { ScrollablePanel } from '../../Scrollable';
import { FormContext } from '../../../templates/Form';
import ExpandableQuote from '../../../atoms/inputs/ExpandableQuote';
import { UserContext } from '../../UserContext';

const SECTION_LABEL = 'Les personnes impliquées';
const SECTION_ID = encodeURIComponent(SECTION_LABEL);

const ÉquipeSection = ({
  initialContacts = {},
  title = 'Les personnes impliquées',
}) => {
  const {
    disabled,
    onChange,
    enrollment: {
      responsable_traitement_family_name = '',
      responsable_traitement_given_name = '',
      responsable_traitement_email = '',
      responsable_traitement_phone_number = '',
      responsable_traitement_job = '',
      dpo_family_name = '',
      dpo_given_name = '',
      dpo_email = '',
      dpo_phone_number = '',
      dpo_job = '',
      contacts,
      user: owner,
    },
  } = useContext(FormContext);

  const { user } = useContext(UserContext);
  const [ownerInformation, setOwnerInformation] = useState({});

  useEffect(() => {
    if (isEmpty(owner)) {
      setOwnerInformation(user);
    } else {
      setOwnerInformation(owner);
    }
  }, [owner, user]);

  useEffect(() => {
    if (isEmpty(contacts)) {
      // initialize contacts
      const defaultContacts = {
        metier: {
          heading: 'Contact métier',
          description: (
            <>
              <b>Le contact métier</b> sera contacté en cas de problème
              fonctionnel sur votre service.
            </>
          ),
        },
        technique: {
          heading: 'Responsable technique',
          description: (
            <>
              <b>Le responsable technique</b> recevra les accès techniques par
              mail. Il sera contacté en cas de problème technique sur votre
              service. Le responsable technique peut être le contact technique
              de votre prestataire.
            </>
          ),
        },
      };

      onChange({
        target: {
          name: 'contacts',
          value: !isEmpty(initialContacts) ? initialContacts : defaultContacts,
        },
      });
    }
  });

  if (isEmpty(contacts)) {
    return null;
  }

  return (
    <ScrollablePanel scrollableId={SECTION_ID}>
      <h2>{title}</h2>
      <ExpandableQuote title="Comment renseigner la liste des contacts ?" large>
        <p>
          <b>Le responsable du traitement des données</b> est la personne
          physique ou morale qui, seule ou conjointement avec d’autres,
          détermine les finalités et les moyens du traitement des données à
          caractère personnel. Seule une personne appartenant à l’organisme
          demandeur peut être renseignée. Cette personne sera notifiée par email
          à la validation de la demande. Ses nom et prénom peuvent également
          être rendus publics.{' '}
          <a
            href={'https://www.cnil.fr/fr/definition/responsable-de-traitement'}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Voir la définition CNIL du responsable de traitement"
          >
            Plus d’infos
          </a>
          .
        </p>
        <p>
          <b>Le délégué à la protection des données</b> assure que
          l’organisation protège convenablement les données à caractère
          personnel, conformément à la législation en vigueur. C'est
          généralement une personne appartenant à l’organisme demandeur. Cette
          personne sera notifiée par email à la validation de la demande.{' '}
          <a
            href={'https://www.cnil.fr/fr/designation-dpo'}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Voir la définition CNIL du délégué à la protection des données"
          >
            Plus d’infos
          </a>
          .
        </p>
        {Object.entries(contacts).map(([key, { description }]) => (
          <p key={key}>{description}</p>
        ))}
      </ExpandableQuote>
      <div className="form__group">
        <div className="contact-list">
          <Contact
            heading="Demandeur"
            id="owner"
            given_name={ownerInformation.given_name}
            family_name={ownerInformation.family_name}
            email={ownerInformation.email}
            phone_number={ownerInformation.phone_number}
            job={ownerInformation.job}
            disabled={true}
            onChange={onChange}
          />
          <Contact
            heading="Responsable de traitement"
            id="responsable_traitement"
            given_name={responsable_traitement_given_name}
            family_name={responsable_traitement_family_name}
            email={responsable_traitement_email}
            phone_number={responsable_traitement_phone_number}
            job={responsable_traitement_job}
            disabled={disabled}
            onChange={onChange}
          />
          <Contact
            heading="Délégué à la protection des données"
            id="dpo"
            given_name={dpo_given_name}
            family_name={dpo_family_name}
            email={dpo_email}
            phone_number={dpo_phone_number}
            job={dpo_job}
            disabled={disabled}
            onChange={onChange}
          />
          {/*
            mind that there might be other legacy contact type present in production database that we
            do not want to display here
          */}
          {!isEmpty(contacts.metier) && (
            <Contact
              id="metier"
              key="metier"
              {...contacts.metier}
              disabled={disabled}
              onChange={onChange}
            />
          )}
          {!isEmpty(contacts.technique) && (
            <Contact
              id="technique"
              {...contacts.technique}
              disabled={disabled}
              onChange={onChange}
            />
          )}
        </div>
      </div>
    </ScrollablePanel>
  );
};

ÉquipeSection.sectionLabel = SECTION_LABEL;

const contactPropTypesShape = {
  technique: PropTypes.shape({
    heading: PropTypes.string,
    email: PropTypes.string,
    phone_number: PropTypes.string,
  }),
  metier: PropTypes.shape({
    heading: PropTypes.string,
    email: PropTypes.string,
    phone_number: PropTypes.string,
  }),
};

ÉquipeSection.propTypes = {
  initialContacts: PropTypes.shape(contactPropTypesShape),
  title: PropTypes.string,
  MiseEnOeuvreDescription: PropTypes.func,
};

export default ÉquipeSection;
