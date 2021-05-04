import React from 'react';
import PropTypes from 'prop-types';

import Form from '../../components/templates/Form';
import OrganisationSection from '../../components/organisms/form-sections/OrganisationSection';
import DemarcheSection from '../../components/organisms/form-sections/DemarcheSection';
import DescriptionSection from '../../components/organisms/form-sections/DescriptionSection';
import DonneesSection from '../../components/organisms/form-sections/DonneesSection';
import CadreJuridiqueSection from '../../components/organisms/form-sections/CadreJuridiqueSection';
import DonneesPersonnellesSection from '../../components/organisms/form-sections/DonneesPersonnellesSection';
import MiseEnOeuvreSection from '../../components/organisms/form-sections/MiseEnOeuvreSection';
import demarches from './demarches.json';
import Quote from '../../components/atoms/inputs/Quote';
import CguSection from '../../components/organisms/form-sections/api-home-plus-sections/CguSection';
import ContratDeLicenceSection from '../../components/organisms/form-sections/api-home-plus-sections/ContratDeLicenceSection';

const DemarcheDescription = () => (
  <div className="notification grey">
    <p>À COMPLÉTER</p>
  </div>
);

const contacts = {
  metier: {
    heading: 'Contact métier',
    description: (
      <p>
        Cette personne sera contactée en cas de problème fonctionnel sur votre
        service.
      </p>
    ),
    family_name: '',
    given_name: '',
    email: '',
    phone_number: '',
  },
  technique: {
    heading: 'Responsable technique',
    description: (
      <p>
        Cette personne recevra les accès techniques par mail. Elle sera
        contactée en cas de problème technique sur votre service. Le responsable
        technique peut être le contact technique de votre prestataire.
      </p>
    ),
    family_name: '',
    given_name: '',
    email: '',
    phone_number: '',
  },
};

const CadreJuridiqueDescription = () => (
  <Quote>
    <p>À COMPLÉTER</p>
  </Quote>
);

const availableScopes = [
  {
    value: '1',
    label: 'API en écriture',
  },
  {
    value: '2',
    label: 'API en lecture',
  },
];

const target_api = 'api_home_plus';

const ApiHomePlus = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <Form
    enrollmentId={enrollmentId}
    target_api={target_api}
    DemarcheDescription={DemarcheDescription}
    demarches={demarches}
    logoLinkUrl="https://api.gouv.fr/producteurs/urssaf"
  >
    <OrganisationSection />
    <DemarcheSection />
    <DescriptionSection />
    <DonneesSection availableScopes={availableScopes} />
    <CadreJuridiqueSection
      CadreJuridiqueDescription={CadreJuridiqueDescription}
    />
    <DonneesPersonnellesSection />
    <MiseEnOeuvreSection
      MiseEnOeuvreDescription={() => null}
      initialContacts={contacts}
    />
    <CguSection />
    <ContratDeLicenceSection />
  </Form>
);

ApiHomePlus.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

ApiHomePlus.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default ApiHomePlus;
