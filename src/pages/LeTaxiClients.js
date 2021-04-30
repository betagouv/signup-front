import React from 'react';
import PropTypes from 'prop-types';

import Form from '../components/templates/Form';
import OrganisationSection from '../components/organisms/form-sections/OrganisationSection';
import DescriptionSection from '../components/organisms/form-sections/DescriptionSection';
import DonneesPersonnellesSection from '../components/organisms/form-sections/DonneesPersonnellesSection';
import MiseEnOeuvreSection from '../components/organisms/form-sections/MiseEnOeuvreSection';
import CguSection from '../components/organisms/form-sections/CguSection';
import { API_ICONS, TARGET_API_LABELS } from '../lib/api';

const DemarcheDescription = () => (
  <div className="notification grey">
    <p>
      Remplissez ce formulaire pour vous inscrire au Registre de disponibilité
      des Taxis.
    </p>
  </div>
);

const LeTaxiClients = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <Form
    enrollmentId={enrollmentId}
    target_api="le_taxi_clients"
    title="Demande d’accès à l’API le.Taxi - applicatifs clients"
    DemarcheDescription={DemarcheDescription}
    logo={{
      src: `/images/${API_ICONS.le_taxi_clients}`,
      alt: `Logo ${TARGET_API_LABELS.le_taxi_clients}`,
      url: 'https://le.taxi/',
    }}
    contactInformation={[
      {
        email: 'equipe@le.taxi',
        label: 'Nous contacter',
        subject: 'Contact%20via%20datapass.api.gouv.fr',
      },
    ]}
  >
    <OrganisationSection />
    <DescriptionSection />
    <DonneesPersonnellesSection />
    <MiseEnOeuvreSection />
    <CguSection cguLink="https://le.taxi/assets/documents/CGU.pdf" />
  </Form>
);

LeTaxiClients.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

LeTaxiClients.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default LeTaxiClients;
