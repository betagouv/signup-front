import React from 'react';
import PropTypes from 'prop-types';

import { API_ICONS, TARGET_API_LABELS } from '../../lib/api';

import Form from '../../components/Form';
import Nav from '../../components/Nav';
import DgfipRgpdAgreement from '../../components/form-sections/DonneesSection/DgfipRgpdAgreement';
import TextSection from '../../components/form-sections/TextSection';
import DescriptionSection from '../../components/form-sections/DescriptionSection';
import OrganisationSection from '../../components/form-sections/OrganisationSection';
import DonneesSection from '../../components/form-sections/DonneesSection';
import CguSection from '../../components/form-sections/CguSection';
import MiseEnOeuvreSection from '../../components/form-sections/MiseEnOeuvreSection';
import CadreJuridiqueSection from '../../components/form-sections/CadreJuridiqueSection';
import {
  contacts,
  DonneesDescription,
  SuiteDescription,
} from './api-impot-particulier-common';

DgfipRgpdAgreement.propTypes = {
  additional_content: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

const availableScopes = [
  {
    value: 'dgfip_acces_spi',
    label:
      'Recherche par identifiant fiscal (SPI) - Restitution de l’état civil complet, de l’adresse et de l’identifiant fiscal (SPI)',
  },
  {
    value: 'dgfip_acces_etat_civil_et_adresse',
    label:
      'Recherche par état civil et adresse - Restitution de l’état civil complet, de l’adresse et de l’identifiant fiscal (SPI)',
  },
  {
    value: 'dgfip_acces_etat_civil',
    label:
      'Recherche par état civil - Restitution de l’identifiant fiscal (SPI)',
  },
];

const useCases = [
  {
    label: 'Entité administrative ou établissement bancaire',
    scopes: ['dgfip_acces_etat_civil'],
  },
  {
    label: 'Ordonnateur',
    scopes: ['dgfip_acces_spi', 'dgfip_acces_etat_civil_et_adresse'],
  },
];

const steps = ['api_r2p_sandbox', 'api_r2p_production'];

const ApiR2PSandbox = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="dashboard">
    <Nav
      logo={{
        src: `/images/${API_ICONS.api_r2p_sandbox}`,
        alt: `Logo ${TARGET_API_LABELS.api_r2p_sandbox}`,
        url: 'https://www.impots.gouv.fr/',
      }}
      navLinks={[
        { id: 'head', label: 'Formulaire', style: { fontWeight: 'bold' } },
        { id: 'organisation', label: 'Organisation' },
        { id: 'description', label: 'Description' },
        { id: 'contacts-moe', label: 'Mise en œuvre' },
        { id: 'donnees', label: 'Données' },
        { id: 'cadre-juridique', label: 'Cadre juridique' },
        { id: 'cgu', label: 'Modalités d’utilisation' },
      ]}
      contactInformation={[
        {
          email: 'contact@api.gouv.fr',
          label: 'Nous contacter',
          subject:
            'Contact%20via%20datapass.api.gouv.fr%20-%20API%20R2p%20bac%20%C3%A0%20sable',
        },
      ]}
    />
    <div className="main">
      <Form
        enrollmentId={enrollmentId}
        target_api="api_r2p_sandbox"
        steps={steps}
        title="Demande d’accès au bac à sable API R2P"
      >
        <OrganisationSection />
        <DescriptionSection />
        <MiseEnOeuvreSection initialContacts={contacts} />
        <DonneesSection
          availableScopes={availableScopes}
          useCases={useCases}
          scopesLabel="Liste des données restituées en fonction des modalités d'accès :"
          AdditionalRgpdAgreement={DgfipRgpdAgreement}
          DonneesDescription={DonneesDescription}
        />
        <CadreJuridiqueSection />
        <CguSection cguLink="/docs/cgu_api_r2p_bac_a_sable_septembre2020_v2.6.pdf" />
        <TextSection
          Description={SuiteDescription}
          title=""
          id="next-steps-description"
        />
      </Form>
    </div>
  </div>
);

ApiR2PSandbox.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

ApiR2PSandbox.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default ApiR2PSandbox;
