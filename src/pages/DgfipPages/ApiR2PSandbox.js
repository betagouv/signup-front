import React from 'react';
import PropTypes from 'prop-types';

import Form from '../../components/templates/Form';
import DescriptionSection from '../../components/organisms/form-sections/DescriptionSection';
import OrganisationSection from '../../components/organisms/form-sections/OrganisationSection';
import CguSection from '../../components/organisms/form-sections/CguSection';
import CadreJuridiqueSection from '../../components/organisms/form-sections/CadreJuridiqueSection';
import DemarcheSection from '../../components/organisms/form-sections/DemarcheSection';
import ÉquipeSection from '../../components/organisms/form-sections/ÉquipeSection';
import DonneesSection from '../../components/organisms/form-sections/DonneesSection';
import { DonneesDescription } from './common';

const demarches = {
  default: {
    label: 'Demande Libre',
    state: {
      intitule: '',
      description: '',
      data_recipients: '',
      data_retention_period: '',
      fondement_juridique_title: '',
      fondement_juridique_url: '',
      additional_content: {
        acces_etat_civil: false,
        acces_spi: false,
        acces_etat_civil_et_adresse: false,
        acces_etat_civil_restitution_spi: false,
      },
      contacts: {},
    },
  },
  ordonnateur: {
    label: 'Ordonnateur (fiabilisation des bases tiers des collectivités)',
    state: {
      additional_content: {
        acces_etat_civil: true,
        acces_spi: true,
        acces_etat_civil_et_adresse: true,
      },
    },
  },
  appel_api_impot_particulier: {
    label:
      'Restitution du numéro fiscal (SPI) pour appel de l’API Impôt particulier',
    state: {
      additional_content: {
        acces_etat_civil_restitution_spi: true,
      },
    },
  },
};

const accessMode = [
  {
    id: 'acces_etat_civil',
    label:
      'Recherche par état civil complet - Restitution de l’état civil complet, de l’adresse et de l’identifiant fiscal (SPI)',
  },
  {
    id: 'acces_spi',
    label:
      'Recherche par identifiant fiscal (SPI) - Restitution de l’état civil complet, de l’adresse et de l’identifiant fiscal (SPI)',
  },
  {
    id: 'acces_etat_civil_et_adresse',
    label:
      'Recherche par état civil dégradé et éléments d’adresse - Restitution de l’état civil complet, de l’adresse et de l’identifiant fiscal (SPI)',
  },
  {
    id: 'acces_etat_civil_restitution_spi',
    label:
      'Recherche par état civil complet - Restitution de l’identifiant fiscal (SPI)',
  },
];

const target_api = 'api_r2p_sandbox';
const steps = [target_api, 'api_r2p_production'];

const ApiR2PSandbox = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <Form
    enrollmentId={enrollmentId}
    target_api={target_api}
    steps={steps}
    demarches={demarches}
    documentationUrl="https://api.gouv.fr/les-api/api_r2p"
  >
    <OrganisationSection />
    <DemarcheSection />
    <DescriptionSection />
    <DonneesSection
      DonneesDescription={DonneesDescription}
      accessModes={accessMode}
    />
    <CadreJuridiqueSection />
    <ÉquipeSection />
    <CguSection
      cguLink="/docs/cgu_api_r2p_bac_a_sable_septembre2020_v2.6.pdf"
      additionalTermsOfUse={[
        {
          id: 'rgpd_general_agreement',
          label: (
            <>
              J’atteste que mon organisation devra déclarer à la DGFiP
              l’accomplissement des formalités en matière de protection des
              données à caractère personnel et qu’elle veillera à procéder à
              l’homologation de sécurité de son projet.
            </>
          ),
        },
      ]}
    />
  </Form>
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
