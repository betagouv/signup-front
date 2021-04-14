import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Form, { FormContext } from '../components/templates/Form';
import Nav from '../components/organisms/Nav';
import OrganisationSection from '../components/organisms/form-sections/OrganisationSection';
import DescriptionSection from '../components/organisms/form-sections/DescriptionSection';
import DonneesPersonnellesSection from '../components/organisms/form-sections/DonneesPersonnellesSection';
import MiseEnOeuvreSection from '../components/organisms/form-sections/MiseEnOeuvreSection';
import CguSection from '../components/organisms/form-sections/CguSection';
import { API_ICONS, TARGET_API_LABELS } from '../lib/api';
import Quote from '../components/atoms/inputs/Quote';
import { ScrollablePanel } from '../components/organisms/Scrollable';
import RadioInput from '../components/atoms/inputs/RadioInput';

const DemarcheDescription = () => (
  <div className="notification grey">
    <p>
      Remplissez ce formulaire pour vous inscrire au Registre de disponibilité
      des Taxis.
    </p>
  </div>
);

const SolutionLogicielleSection = () => {
  const {
    disabled,
    onChange,
    enrollment: {
      additional_content: { solution_logicielle = '' },
    },
  } = useContext(FormContext);

  return (
    <ScrollablePanel scrollableId="solution-logicielle">
      <h2>Quelle solution logicielle utilisez-vous ?</h2>
      <Quote>
        <p>
          Si vous utilisez une solution proposée par un éditeur, celui-ci sera
          informé de votre souhait de connecter votre flotte à l’API. Si vous
          utilisez une autre solution, vous devrez effectuer les développements
          pour vous connecter (vous pouvez consulter la documentation technique
          sur notre site)
        </p>
      </Quote>
      <RadioInput
        label={'Solution logicielle utilisée'}
        options={[
          { id: 'axygest', label: 'Axygest' },
          { id: 'tessa', label: 'Tessa' },
          { id: 'appsolu', label: 'Appsolu' },
          { id: 'solution_interne', label: 'Solution développée en interne' },
        ]}
        name={'additional_content.solution_logicielle'}
        value={solution_logicielle}
        disabled={disabled}
        onChange={onChange}
      />
    </ScrollablePanel>
  );
};

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
  <div className="dashboard">
    <Nav
      logo={{
        src: `/images/${API_ICONS.le_taxi_chauffeurs}`,
        alt: `Logo ${TARGET_API_LABELS.le_taxi_chauffeurs}`,
        url: 'https://le.taxi/',
      }}
      navLinks={[
        { id: 'head', label: 'Formulaire', style: { fontWeight: 'bold' } },
        { id: 'organisation', label: 'Organisation' },
        { id: 'description', label: 'Description' },
        { id: 'solution-logicielle', label: 'Solution logicielle' },
        { id: 'donnees-personnelles', label: 'Données personnelles' },
        { id: 'contacts-moe', label: 'Mise en œuvre' },
        { id: 'cgu', label: "Modalités d'utilisation" },
      ]}
      contactInformation={[
        {
          email: 'equipe@le.taxi',
          label: 'Nous contacter',
          subject: 'Contact%20via%20datapass.api.gouv.fr',
        },
      ]}
    />
    <div className="main">
      <Form
        enrollmentId={enrollmentId}
        target_api="le_taxi_chauffeurs"
        title="Demande d'accès à l'API le.Taxi - applicatifs chauffeurs"
        DemarcheDescription={DemarcheDescription}
      >
        <OrganisationSection />
        <DescriptionSection />
        <SolutionLogicielleSection />
        <DonneesPersonnellesSection />
        <MiseEnOeuvreSection initialContacts={contact} />
        <CguSection cguLink="https://le.taxi/assets/documents/CGU.pdf" />
      </Form>
    </div>
  </div>
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
