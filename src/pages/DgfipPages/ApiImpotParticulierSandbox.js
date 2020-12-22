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
  availableScopes as fcAvailableScopes,
  CguDescription,
  contacts,
  DemarcheDescription,
  DonneesDescription,
  DonneesFootnote,
  SuiteDescription,
} from './api-impot-particulier-common';
import Quote from '../../components/Form/components/Quote';

export const CadreJuridiqueDescription = () => (
  <Quote>
    <p>
      Pour pouvoir bénéficier du raccordement à l‘API Impôt particulier, le
      cadre légal et réglementaire des fournisseurs de service doit permettre à
      la DGFiP de transmettre des données fiscales à son futur partenaire
      conventionné.
    </p>
    <p>
      Conformément au Code des relations entre le public et l’administration,
      l’échange de données s’impose aux partenaires conventionnés
      (administration, collectivité, établissement bancaire…) dès lors que :
    </p>
    <ul>
      <li>
        ces données sont nécessaires au traitement d’une demande présentée par
        un usager ;
      </li>
      <li>
        le partenaire conventionné destinataire est habilité à connaître ces
        données dans le cadre de ses missions (Article L114-8 1er alinéa modifié
        par LOI n°2016-1321 du 7 octobre 2016 - art. 91 ou tout texte législatif
        ou réglementaire permettant de justifier que le partenaire ait accès aux
        données).
      </li>
    </ul>
  </Quote>
);

const steps = [
  'api_impot_particulier_sandbox',
  'api_impot_particulier_production',
];

const groupTitle = "Sélectionnez les modalités d'accès à l'API :";

const availableScopes = [
  ...fcAvailableScopes,
  {
    value: 'dgfip_eligibilite_lep',
    label: "Indicateur d'éligibilité au Livret d'Épargne Populaire",
    helper:
      "Actuellement, accès à l'avant-dernière année de revenus. Accès aux dernière et avant-avant-dernière années d'ici la fin du 1er semestre 2021.",
  },
  {
    value: 'dgfip_acces_spi',
    label: 'via le Numéro fiscal (SPI)',
    groupTitle,
  },
  {
    value: 'dgfip_acces_etat_civil',
    label: "via l'état civil",
    helper: "Merci de remplir une demande de souscription à l'API R2P.",
    groupTitle,
  },
];

const ApiImpotParticulierSandbox = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="dashboard">
    <Nav
      logo={{
        src: `/images/${API_ICONS.api_impot_particulier_sandbox}`,
        alt: `Logo ${TARGET_API_LABELS.api_impot_particulier_sandbox}`,
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
            'Contact%20via%20datapass.api.gouv.fr%20-%20API%20Impôt%20particulier%20bac%20%C3%A0%20sable',
        },
      ]}
    />
    <div className="main">
      <Form
        enrollmentId={enrollmentId}
        target_api="api_impot_particulier_sandbox"
        steps={steps}
        title="Demande d’accès au bac à sable API Impôt particulier"
        DemarcheDescription={DemarcheDescription}
      >
        <OrganisationSection />
        <DescriptionSection />
        <MiseEnOeuvreSection initialContacts={contacts} />
        <DonneesSection
          availableScopes={availableScopes}
          AdditionalRgpdAgreement={DgfipRgpdAgreement}
          DonneesDescription={DonneesDescription}
          DonneesFootnote={DonneesFootnote}
        />
        <CadreJuridiqueSection
          CadreJuridiqueDescription={CadreJuridiqueDescription}
        />
        <CguSection
          cguLink="/docs/cgu_api_impot_particulier_bac_a_sable_connexion_hors_fc_septembre2020_v2.6.pdf"
          CguDescription={CguDescription}
        />
        <TextSection
          Description={SuiteDescription}
          title=""
          id="next-steps-description"
        />
      </Form>
    </div>
  </div>
);

ApiImpotParticulierSandbox.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

ApiImpotParticulierSandbox.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default ApiImpotParticulierSandbox;
