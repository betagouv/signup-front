import React from 'react';
import PropTypes from 'prop-types';

import Form from '../components/templates/Form';
import OrganisationSection from '../components/organisms/form-sections/OrganisationSection';
import DescriptionSection from '../components/organisms/form-sections/DescriptionSection';
import CadreJuridiqueSection from '../components/organisms/form-sections/CadreJuridiqueSection';
import CguSection from '../components/organisms/form-sections/CguSection';
import MiseEnOeuvreSection from '../components/organisms/form-sections/MiseEnOeuvreSection';
import IpSection from '../components/organisms/form-sections/agence-bio-sections/IpSection';

const AgenceBio = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <Form
    enrollmentId={enrollmentId}
    target_api="agence_bio"
    title="Demande d’accès à l’API Agence Bio"
    contactInformation={[
      {
        email: 'contact@api.gouv.fr',
        label: 'Nous contacter',
        subject:
          'Contact%20via%20datapass.api.gouv.fr%20-%20API%20Agence%20Bio',
      },
    ]}
  >
    <OrganisationSection />
    <DescriptionSection />
    <CadreJuridiqueSection />
    <IpSection />
    <MiseEnOeuvreSection />
    <CguSection cguLink="https://entreprise.api.gouv.fr/cgu/" />
  </Form>
);

AgenceBio.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

AgenceBio.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default AgenceBio;
