import React from 'react';
import PropTypes from 'prop-types';

import Form from '../../components/templates/Form';
import Nav from '../../components/organisms/Nav';
import OrganisationSection from '../../components/organisms/form-sections/OrganisationSection';
import DemarcheSection from '../../components/organisms/form-sections/DemarcheSection';
import DescriptionSection from '../../components/organisms/form-sections/DescriptionSection';
import CadreJuridiqueSection from '../../components/organisms/form-sections/CadreJuridiqueSection';
import CguSection from '../../components/organisms/form-sections/CguSection';
import DonneesPersonnellesSection from '../../components/organisms/form-sections/DonneesPersonnellesSection';
import MiseEnOeuvreSection from '../../components/organisms/form-sections/MiseEnOeuvreSection';
import demarches from './demarches.json';

const ApiServiceNational = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="dashboard">
    <Nav
      navLinks={[
        { id: 'head', label: 'Formulaire', style: { fontWeight: 'bold' } },
        { id: 'organisation', label: 'Organisation' },
        { id: 'modeles-preremplis', label: 'Modèles pré-remplis' },
        { id: 'description', label: 'Description' },
        { id: 'cadre-juridique', label: 'Cadre juridique' },
        { id: 'donnees-personnelles', label: 'Données personnelles' },
        { id: 'contacts-moe', label: 'Mise en œuvre' },
        { id: 'cgu', label: "Modalités d'utilisation" },
      ]}
      contactInformation={[
        {
          email: 'contact@api.gouv.fr',
          label: 'Nous contacter',
          subject:
            'Contact%20via%20datapass.api.gouv.fr%20-%20API%20Service%20National',
        },
      ]}
    />
    <div className="main">
      <Form
        enrollmentId={enrollmentId}
        target_api="api_service_national"
        title="Demande d'accès à l'API Service National"
        demarches={demarches}
      >
        <OrganisationSection />
        <DemarcheSection />
        <DescriptionSection />
        <CadreJuridiqueSection />
        <DonneesPersonnellesSection />
        <MiseEnOeuvreSection />
        <CguSection cguLink="https://presaje.sga.defense.gouv.fr/cgu-dln1f" />
      </Form>
    </div>
  </div>
);

ApiServiceNational.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

ApiServiceNational.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default ApiServiceNational;
