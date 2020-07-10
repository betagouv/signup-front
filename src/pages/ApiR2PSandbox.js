import React from 'react';
import PropTypes from 'prop-types';

import { API_ICONS, TARGET_API_LABELS } from '../lib/api';

import Form from '../components/Form';
import Nav from '../components/Nav';
import DgfipRgpdAgreement from '../components/form-sections/DonneesSection/DgfipRgpdAgreement';
import TextSection from '../components/form-sections/TextSection';
import DescriptionSection from '../components/form-sections/DescriptionSection';
import OrganisationSection from '../components/form-sections/OrganisationSection';
import DonneesSection from '../components/form-sections/DonneesSection';
import CguSection from '../components/form-sections/CguSection';
import MiseEnOeuvreSection from '../components/form-sections/MiseEnOeuvreSection';
import VolumetrieSection from '../components/form-sections/dgfip/VolumetrieSection';
import CadreJuridiqueSection from '../components/form-sections/CadreJuridiqueSection';
import { DonneesDescription } from './ApiImpotParticulier';

DgfipRgpdAgreement.propTypes = {
  additional_content: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

const availableScopes = [
  {
    value: 'spi',
    label: 'Numéro fiscal (SPI)',
  },
  {
    value: 'etat_civil',
    label: 'État civil',
  },
  {
    value: 'adresse',
    label: 'Adresse',
  },
];

const useCases = [
  {
    label: 'Établissement bancaire',
    scopes: ['spi'],
  },
  {
    label: 'Ordonnateur',
    scopes: ['spi', 'etat_civil', 'adresse'],
  },
];

export const cguLink =
  '/docs/conditions_generales_d_utilisation_de_l_api_impot_particulier_v3.pdf';

const SuiteDescription = () => (
  <div className="text-quote">
    <p>
      Après avoir cliqué sur « Soumettre la demande », les prochaines étapes
      sont :
    </p>
    <ol>
      <li>Le fournisseur de données de l’API va instruire la demande.</li>
      <li>
        En cours d’instruction, le fournisseur de données pourra vous demander
        par courriel des informations supplémentaires.
      </li>
      <li>
        Après instruction, vous serez informé par courriel de l’acceptation ou
        du refus de votre demande.
      </li>
    </ol>
    <p>En cas d’acceptation de votre demande :</p>
    <ul>
      <li>
        Le contact technique recevra par mail les informations nécessaires pour
        accéder à l’API de test.
      </li>
      <li>
        Vous recevrez par mail un lien vers un deuxième formulaire à remplir
        pour accéder à l’API de production.
      </li>
    </ul>
  </div>
);

const contacts = {
  technique: {
    heading: 'Responsable technique',
    description: () => (
      <p>
        Cette personne recevra les accès techniques par mail. Elle pourra
        également être contactée par téléphone pour faciliter le raccordement à
        l'API. Le responsable technique peut être le contact technique de votre
        prestataire.
      </p>
    ),
    family_name: '',
    given_name: '',
    email: '',
    phone_number: '',
  },
};

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
        { id: 'volumetrie', label: 'Volumétrie' },
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
            'Contact%20via%20signup.api.gouv.fr%20-%20API%20Impôt%20particulier',
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
        <VolumetrieSection options={[1000]} />
        <MiseEnOeuvreSection initialContacts={contacts} />
        <DonneesSection
          availableScopes={availableScopes}
          useCases={useCases}
          scopesLabel="Liste des modalités d'accès correspondantes :"
          AdditionalRgpdAgreement={DgfipRgpdAgreement}
          DonneesDescription={DonneesDescription}
        />
        <CadreJuridiqueSection />
        <CguSection cguLink={cguLink} />
        <TextSection Description={SuiteDescription} title="" />
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
