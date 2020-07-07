import React from 'react';
import PropTypes from 'prop-types';

import Form from '../components/Form';
import Nav from '../components/Nav';
import OrganisationSection from '../components/form-sections/OrganisationSection';
import DescriptionSection from '../components/form-sections/DescriptionSection';
import DonneesSection from '../components/form-sections/DonneesSection';
import CadreJuridiqueSection from '../components/form-sections/CadreJuridiqueSection';
import DonneesPersonnellesSection from '../components/form-sections/DonneesPersonnellesSection';
import MiseEnOeuvreSection from '../components/form-sections/MiseEnOeuvreSection';
import CguSection from '../components/form-sections/CguSection';

const DemarcheDescription = () => (
  <div className="notification grey">
    <p>
      Remplissez ce formulaire pour vous inscrire au Registre de disponibilité
      des Taxis en tant qu'Opérateur ou en tant que Moteur de Recherche
    </p>
  </div>
);

const DonneesDescription = () => (
  <div className="text-quote">
    <p>
      Selon la nature de votre service, les données auxquelles vous aurez accès
      vont différer.
    </p>
  </div>
);

const availableScopes = [
  {
    value: 'operator',
    label: 'Opérateur de taxi',
  },
  {
    value: 'search_engine',
    label: 'Moteur de Recherche',
  },
];

const LeTaxi = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="dashboard">
    <Nav
      navLinks={[
        { id: 'head', label: 'Formulaire', style: { fontWeight: 'bold' } },
        { id: 'organisation', label: 'Organisation' },
        { id: 'description', label: 'Description' },
        { id: 'donnees', label: 'Données' },
        { id: 'cadre-juridique', label: 'Cadre juridique' },
        { id: 'donnees-personnelles', label: 'Données personnelles' },
        { id: 'contacts-moe', label: 'Mise en œuvre' },
        { id: 'cgu', label: "Modalités d'utilisation" },
      ]}
      contactInformation={[
        {
          email: 'contact@api.gouv.fr',
          label: 'Nous contacter',
          subject: 'Contact%20via%20signup.api.gouv.fr',
        },
      ]}
    />
    <div className="main">
      <Form
        enrollmentId={enrollmentId}
        target_api="le_taxi"
        title="Demande d'accès à l'API le.Taxi"
        DemarcheDescription={DemarcheDescription}
      >
        <OrganisationSection />
        <DescriptionSection />
        <DonneesSection
          scopesLabel="Sélectionnez la nature de votre service :"
          DonneesDescription={DonneesDescription}
          availableScopes={availableScopes}
        />
        <CadreJuridiqueSection />
        <DonneesPersonnellesSection />
        <MiseEnOeuvreSection />
        <CguSection cguLink="https://le.taxi/assets/documents/CGU.pdf" />
      </Form>
    </div>
  </div>
);

LeTaxi.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

LeTaxi.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default LeTaxi;
