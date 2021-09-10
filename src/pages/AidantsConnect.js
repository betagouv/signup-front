import React from 'react';
import PropTypes from 'prop-types';

import Form from '../components/templates/Form';
import OrganisationSection from '../components/organisms/form-sections/OrganisationSection';
import CguSection from '../components/organisms/form-sections/CguSection';
import LabelsSection from '../components/organisms/form-sections/aidants-connect-sections/LabelsSection';
import AidantsSection from '../components/organisms/form-sections/aidants-connect-sections/AidantsSection';
import StructureSection from '../components/organisms/form-sections/aidants-connect-sections/StructureSection';
import MiseEnOeuvreSection from '../components/organisms/form-sections/deprecated/MiseEnOeuvreSection';
import Quote from '../components/atoms/inputs/Quote';
import ÉquipeSection from '../components/organisms/form-sections/ÉquipeSection';

const contacts = {
  contact_metier: {
    heading: 'Responsable Aidants Connect',
    description: (
      <Quote>
        <p>
          Un responsable Aidants Connect doit être désigné. Il est en charge de
          la mise en place et du suivi d’Aidants Connect au sein du lieu
          d’accueil. Il tient également à jour la liste des aidants habilités
          Aidants Connect sur son espace administrateur (à venir).
        </p>
      </Quote>
    ),
    family_name: '',
    given_name: '',
    emailDescription: (
      <Quote>
        <p>
          Pour des raisons de sécurité, nous n’acceptons que les adresses emails
          nominatives et individuelles. Étant un outil homologué par l’Agence
          Nationale de la Cohésion des Territoires, cela est un prérequis pour
          garantir la sécurité de l’outil et la fiabilité des traces de
          connexion.
        </p>
        <p>
          <b>
            Seule une adresse email individuelle, professionnelle et nominative
            sera acceptée. Les adresses de type contact@, ccas.ville@, mairie@,
            direction@, franceservices@ ne sont donc pas acceptées.
          </b>
        </p>
        <p>
          Nous acceptons au besoin des adresses emails nominatives venant de
          fournisseurs comme La Poste, Protonmail ou autres.
        </p>
      </Quote>
    ),
    email: '',
    phone_number: '',
    job: '',
  },
};

const initialContacts = {
  demandeur: {
    header: 'Demandeur',
    description: (
      <>
        <b>Le demandeur</b>, c'est vous, dépose la demande et sera contacté en
        cas de problème fonctionnel sur votre service.
      </>
    ),
    forceDisable: true,
  },
  responsable_metier: {
    header: 'Responsable Aidants Connect',
    description: (
      <>
        <b>Un responsable Aidants Connect</b> doit être désigné. Il est en
        charge de la mise en place et du suivi d’Aidants Connect au sein du lieu
        d’accueil. Il tient également à jour la liste des aidants habilités
        Aidants Connect sur son espace administrateur (à venir).
      </>
    ),
  },
};

const additionalTermsOfUse = [
  {
    id: 'has_professional_contact_only',
    label: (
      <>
        Je confirme que la liste des aidants à habiliter contient exclusivement
        des aidants professionnels. Elle ne contient donc ni service civique, ni
        bénévole, ni apprenti, ni stagiaire.
      </>
    ),
  },
  {
    id: 'has_non_elected_contact_only',
    label: (
      <>
        Je confirme qu’aucun élu n’est impliqué dans l’habilitation Aidants
        Connect. Le responsable Aidants Connect ainsi que les aidants à
        habiliter ne sont pas des élus.
      </>
    ),
  },
];

const AidantsConnect = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <Form
    enrollmentId={enrollmentId}
    target_api="aidants_connect"
    documentationUrl="https://aidantsconnect.beta.gouv.fr/"
    contactInformation={[
      {
        email: 'contact@aidantsconnect.beta.gouv.fr',
        label: 'Nous contacter',
        subject: 'Contact%20via%20datapass.api.gouv.fr',
      },
    ]}
  >
    <OrganisationSection />
    <StructureSection />
    <LabelsSection />
    <ÉquipeSection initialContacts={initialContacts} />
    <MiseEnOeuvreSection
      title="Coordonnées du référent de votre structure"
      initialContacts={contacts}
      MiseEnOeuvreDescription={() => null}
    />
    <AidantsSection />
    <CguSection
      cguLink="https://aidantsconnect.beta.gouv.fr/cgu/"
      additionalTermsOfUse={additionalTermsOfUse}
    />
  </Form>
);

AidantsConnect.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

AidantsConnect.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default AidantsConnect;
