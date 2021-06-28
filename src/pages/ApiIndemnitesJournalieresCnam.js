import React from 'react';
import PropTypes from 'prop-types';

import Form from '../components/templates/Form';
import OrganisationSection from '../components/organisms/form-sections/OrganisationSection';
import DescriptionSection from '../components/organisms/form-sections/DescriptionSection';
import CadreJuridiqueSection from '../components/organisms/form-sections/CadreJuridiqueSection';
import DonneesPersonnellesSection from '../components/organisms/form-sections/DonneesPersonnellesSection';
import MiseEnOeuvreSection from '../components/organisms/form-sections/MiseEnOeuvreSection';
import CguSection from '../components/organisms/form-sections/CguSection';
import DonneesSection from '../components/organisms/form-sections/DonneesSection';

const availableScopes = [
  {
    value: 'cnam_PaiementIndemnitesJournalieres',
    label: 'Période indemnisée et montants journaliers',
  },
];

const steps = ['franceconnect', 'api_indemnites_journalieres_cnam'];

const ApiIndemnitesJournalieresCnam = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <Form
    enrollmentId={enrollmentId}
    target_api="api_indemnites_journalieres_cnam"
    steps={steps}
  >
    <OrganisationSection />
    <DescriptionSection />
    <DonneesSection availableScopes={availableScopes} />
    <CadreJuridiqueSection />
    <DonneesPersonnellesSection />
    <MiseEnOeuvreSection />
    <CguSection cguLink="/docs/API_Droits_CNAM_CGU_20181210.pdf" />
  </Form>
);

ApiIndemnitesJournalieresCnam.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

ApiIndemnitesJournalieresCnam.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default ApiIndemnitesJournalieresCnam;
