import React from 'react';
import PropTypes from 'prop-types';

import Form from '../components/templates/Form';
import OrganisationSection from '../components/organisms/form-sections/OrganisationSection';
import DescriptionSection from '../components/organisms/form-sections/DescriptionSection';
import DonneesPersonnellesSection from '../components/organisms/form-sections/DonneesPersonnellesSection';
import MiseEnOeuvreSection from '../components/organisms/form-sections/MiseEnOeuvreSection';
import CguSection from '../components/organisms/form-sections/CguSection';
import SolutionLogicielleSection from '../components/organisms/form-sections/le-taxi-sections/SolutionLogicielleSection';
import { API_ICONS, TARGET_API_LABELS } from '../lib/api';

const DemarcheDescription = () => (
  <div className="notification grey">
    <p>
      Remplissez ce formulaire pour vous inscrire au Registre de disponibilité
      des Taxis.
    </p>
  </div>
);

const contact = {
  metier: {
    heading: 'Personne en charge du suivi',
    description: (
      <p>
        Cette personne sera notre point d’entrée dans votre entreprise. Si la
        solution logicielle que votre groupement ou centrale utilise est
        développée en interne, les codes d’accès à l’API seront envoyées à cette
        personne.
      </p>
    ),
    email: '',
  },
};

const LeTaxiChauffeurs = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <Form
    enrollmentId={enrollmentId}
    target_api="le_taxi_chauffeurs"
    title="Demande d’accès à l’API le.Taxi - applicatifs chauffeurs"
    DemarcheDescription={DemarcheDescription}
    logo={{
      src: `/images/${API_ICONS.le_taxi_chauffeurs}`,
      alt: `Logo ${TARGET_API_LABELS.le_taxi_chauffeurs}`,
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
    <SolutionLogicielleSection />
    <DonneesPersonnellesSection />
    <MiseEnOeuvreSection initialContacts={contact} />
    <CguSection cguLink="https://le.taxi/assets/documents/CGU.pdf" />
  </Form>
);

LeTaxiChauffeurs.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

LeTaxiChauffeurs.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default LeTaxiChauffeurs;
