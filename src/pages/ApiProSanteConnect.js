import React from 'react';
import PropTypes from 'prop-types';

import Form from '../components/templates/Form';
import OrganisationSection from '../components/organisms/form-sections/OrganisationSection';
import DescriptionSection from '../components/organisms/form-sections/DescriptionSection';
import DonneesSection from '../components/organisms/form-sections/DonneesSection';
import CadreJuridiqueSection from '../components/organisms/form-sections/CadreJuridiqueSection';
import CguSection from '../components/organisms/form-sections/CguSection';
import DonneesPersonnellesSection from '../components/organisms/form-sections/DonneesPersonnellesSection';
import MiseEnOeuvreSection from '../components/organisms/form-sections/MiseEnOeuvreSection';
import Quote from '../components/atoms/inputs/Quote';

const CadreJuridiqueDescription = () => (
  <Quote>
    <p>
      Seules les administrations et les éditeurs de logiciels français qui
      s’adressent aux professionnels de la santé peuvent avoir accès à l’API Pro
      Santé Connect.
    </p>
  </Quote>
);

const availableScopes = [
  {
    value: 'idnat',
    label: 'identifiant unique (idNat)',
  },
  {
    value: 'etat_civil',
    label: 'État Civil',
  },
  {
    value: 'donnees_sectorielles',
    label: 'Données sectorielles',
  },
];

const target_api = 'api_pro_sante_connect';

const ApiProSanteConnect = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <Form enrollmentId={enrollmentId} target_api={target_api}>
    <OrganisationSection />
    <DescriptionSection />
    <DonneesSection availableScopes={availableScopes} />
    <CadreJuridiqueSection
      CadreJuridiqueDescription={CadreJuridiqueDescription}
    />
    <DonneesPersonnellesSection />
    <MiseEnOeuvreSection
      title="Coordonnées du référent de votre structure"
      MiseEnOeuvreDescription={() => null}
    />
    <CguSection cguLink="/docs/conditions_generales_d_utilisation_de_pro_sante_connect.pdf" />
  </Form>
);

ApiProSanteConnect.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

ApiProSanteConnect.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default ApiProSanteConnect;
