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
import { contacts, SuiteDescription } from './api-impot-particulier-common';

DgfipRgpdAgreement.propTypes = {
  additional_content: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

const groupTitle = "Sélectionnez les modalités d'accès à l'API :";

const availableScopes = [
  {
    value: 'dgfip_ficoba_etat_civil_denomination',
    label: 'État civil ou dénomination',
  },
  {
    value: 'dgfip_ficoba_adresse',
    label: 'Adresse',
  },
  {
    value: 'dgfip_ficoba_compte',
    label: 'Désignation du compte',
    mandatory: true,
  },
  {
    value: 'dgfip_ficoba_etablissement_bancaire',
    label: 'Établissement bancaire',
  },
  {
    value: 'dgfip_ficoba_date',
    label: 'Date',
  },
  {
    value: 'dgfip_acces_ficoba_iban',
    label: 'via IBAN',
    groupTitle,
  },
  {
    value: 'dgfip_acces_ficoba_spi',
    label: 'via le Numéro fiscal (SPI)',
    groupTitle,
  },
  {
    value: 'dgfip_acces_ficoba_siren',
    label: 'via SIREN/SIRET',
    groupTitle,
  },
  {
    value: 'dgfip_acces_ficoba_personne_physique',
    label: 'via personne physique',
    groupTitle,
  },
  {
    value: 'dgfip_acces_ficoba_personne_morale',
    label: 'via personne morale',
    groupTitle,
  },
];

const steps = ['api_ficoba_sandbox', 'api_ficoba_production'];

export const DonneesDescription = () => (
  <div className="text-quote">
    <p>
      L'API FICOBA restituant des éléments sensibles (comptes bancaires du
      titulaire et/ou du co-titulaire, éléments relatifs à l'état civil et au
      lieu de résidence du titulaire et/ou du co-titulaire) est couverte par la
      règle du secret professionnel prévue par les dispositions de l’article L.
      103 du Livre des Procédures Fiscales, car elles constituent des données
      nominatives et personnelles. Il ne peut être dérogé au secret
      professionnel que par une disposition législative spécifique.
    </p>
    <p>
      En conséquence, les informations restituées par l'API FICOBA ne peuvent
      être communiquées qu’aux personnes, organismes ou autorités bénéficiant
      d’une telle mesure et dans la limite fixée par la loi.
    </p>
    <p>
      La loi informatique et libertés définit les principes à respecter lors de
      la collecte, du traitement et de la conservation de données personnelles.
    </p>
    <p>L’article 6 précise :</p>
    <ul>
      <li>
        3° [les données] sont adéquates, pertinentes et non excessives au regard
        des finalités pour lesquelles elles sont collectées et de leurs
        traitements ultérieurs ;
      </li>
      <li>
        4° Elles sont exactes, complètes et, si nécessaire, mises à jour ; les
        mesures appropriées doivent être prises pour que les données inexactes
        ou incomplètes au regard des finalités pour lesquelles elles sont
        collectées ou traitées soient effacées ou rectifiées ;
      </li>
    </ul>
    <p>
      Nous vous remercions de sélectionner uniquement les données strictement
      nécessaires à votre téléservice.
    </p>
    <p>
      Le non-respect du principe de proportionnalité vous expose vis à vis de la
      CNIL.
    </p>
  </div>
);

export const CadreJuridiqueDescription = () => (
  <div className="text-quote">
    <p>
      L’accès au dispositif API FICOBA est soumis à deux conditions
      cumulatives :
    </p>
    <ul>
      <li>
        la ou les information(s) recherchée(s) par le fournisseur de service
        doivent être strictement nécessaires au traitement d’une demande ou dans
        l'exercice des missions du fournisseur de service justifiant l’accès
        auxdites informations ;
      </li>
      <li>
        l'accès aux informations s'inscrit en application d’un texte législatif
        ou réglementaire.
      </li>
    </ul>
    <p>
      Le fournisseur de service sollicitant le raccordement au dispositif doit
      être autorisé à demander et exploiter les données fiscales dans le cadre
      de l'exercice de ses missions.
    </p>
  </div>
);

const ApiFicobaSandbox = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="dashboard">
    <Nav
      logo={{
        src: `/images/${API_ICONS.api_ficoba_sandbox}`,
        alt: `Logo ${TARGET_API_LABELS.api_ficoba_sandbox}`,
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
            'Contact%20via%20datapass.api.gouv.fr%20-%20API%20FICOBA%20bac%20%C3%A0%20sable',
        },
      ]}
    />
    <div className="main">
      <Form
        enrollmentId={enrollmentId}
        target_api="api_ficoba_sandbox"
        steps={steps}
        title="Demande d’accès au bac à sable API FICOBA"
      >
        <OrganisationSection />
        <DescriptionSection />
        <MiseEnOeuvreSection initialContacts={contacts} />
        <DonneesSection
          availableScopes={availableScopes}
          AdditionalRgpdAgreement={DgfipRgpdAgreement}
          DonneesDescription={DonneesDescription}
        />
        <CadreJuridiqueSection
          CadreJuridiqueDescription={CadreJuridiqueDescription}
        />
        <CguSection cguLink="/docs/cgu_api_ficoba_bac_a_sable_decembre2020_v1.1.pdf" />
        <TextSection Description={SuiteDescription} title="" />
      </Form>
    </div>
  </div>
);

ApiFicobaSandbox.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

ApiFicobaSandbox.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default ApiFicobaSandbox;
