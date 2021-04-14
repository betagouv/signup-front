import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Form, { FormContext } from '../../components/templates/Form';
import Nav from '../../components/organisms/Nav';
import OrganisationSection from '../../components/organisms/form-sections/OrganisationSection';
import DemarcheSection from '../../components/organisms/form-sections/DemarcheSection';
import DescriptionSection from '../../components/organisms/form-sections/DescriptionSection';
import DonneesSection from '../../components/organisms/form-sections/DonneesSection';
import CadreJuridiqueSection from '../../components/organisms/form-sections/CadreJuridiqueSection';
import DonneesPersonnellesSection from '../../components/organisms/form-sections/DonneesPersonnellesSection';
import MiseEnOeuvreSection from '../../components/organisms/form-sections/MiseEnOeuvreSection';
import demarches from './demarches.json';
import Quote from '../../components/atoms/inputs/Quote';
import { API_ICONS, TARGET_API_LABELS } from '../../lib/api';
import { ScrollablePanel } from '../../components/organisms/Scrollable';
import FileInput from '../../components/molecules/FileInput';

const DemarcheDescription = () => (
  <div className="notification grey">
    <p>À COMPLÉTER</p>
  </div>
);

const contacts = {
  metier: {
    heading: 'Contact métier',
    description: (
      <p>
        Cette personne sera contactée en cas de problème fonctionnel sur votre
        service.
      </p>
    ),
    family_name: '',
    given_name: '',
    email: '',
    phone_number: '',
  },
  technique: {
    heading: 'Responsable technique',
    description: (
      <p>
        Cette personne recevra les accès techniques par mail. Elle sera
        contactée en cas de problème technique sur votre service. Le responsable
        technique peut être le contact technique de votre prestataire.
      </p>
    ),
    family_name: '',
    given_name: '',
    email: '',
    phone_number: '',
  },
};

const CadreJuridiqueDescription = () => (
  <Quote>
    <p>À COMPLÉTER</p>
  </Quote>
);

const availableScopes = [
  {
    value: '1',
    label: 'API en écriture',
  },
  {
    value: '2',
    label: 'API en lecture',
  },
];

const ModaliteUtilisationSection = () => {
  const {
    disabled,
    onChange,
    enrollment: { documents = [], documents_attributes = [] },
  } = useContext(FormContext);

  return (
    <ScrollablePanel scrollableId="cgu">
      <h2>Modalités d’utilisation</h2>
      <Quote>
        <p>
          Afin de vérifier que vous êtes en pleine connaissance de vos
          obligations fiscales (paiement de la TVA et de l’impôt sur le revenu
          ou sur les sociétés selon votre situation), merci de joindre une
          attestation fiscale justifiant de la régularité de votre situation
          fiscale.
        </p>
      </Quote>
      <FileInput
        disabled={disabled}
        uploadedDocuments={documents}
        documentsToUpload={documents_attributes}
        documentType={'Document::DecisionHomologation'}
        handleChange={onChange}
        label={'Attestation fiscale'}
      />
      <Quote>
        <p>
          Afin de vérifier que vous êtes habilité à fournir des prestations de
          services à domicile, merci de joindre un document justifiant que vous
          êtes agréé dans les conditions prévues à l’article L. 7232-1 du code
          du travail, que vous procédez à la déclaration prévue à l’article L.
          7232-1-1 du code du travail ou que vous disposez d’une autorisation en
          cours de validité pour exercer les activités relevant du I de
          l’article D. 312-6-2 du code de l’action sociale et des familles
        </p>
      </Quote>
      <FileInput
        disabled={disabled}
        uploadedDocuments={documents}
        documentsToUpload={documents_attributes}
        documentType={'Document::DecisionHomologation'}
        handleChange={onChange}
        label={'Habilitation service à domicile'}
      />
    </ScrollablePanel>
  );
};

const ContratDeLicenceSection = () => {
  const {
    disabled,
    onChange,
    enrollment: { documents = [], documents_attributes = [] },
  } = useContext(FormContext);

  return (
    <ScrollablePanel scrollableId="licence">
      <h2>Contrat de Licence</h2>
      <Quote>
        <p>
          La signature devra impérativement être réalisée électroniquement par
          un dispositif certifié.
        </p>
        <p>
          Dans le cas où votre organisme n’aurait pas de dispositif de signature
          électronique, l’outil Docusign (
          <a
            href={'https://www.docusign.fr'}
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.docusign.fr
          </a>
          ) offre par exemple un accès de 30 jours à sa plateforme de signature.
        </p>
        <p>
          Il vous suffira de cliquer sur « Essai gratuit » en haut à droite de
          la page Web, de créer un compte et de l’activer. Une fois cela fait,
          vous devrez déposer votre document sur la page, cocher la case « Je
          suis le seul signataire » et suivre les instructions. Vous pourrez
          utiliser le champ « Signature » présent dans le menu à gauche pour
          déposer votre signature sur le document
        </p>
      </Quote>
      <FileInput
        disabled={disabled}
        uploadedDocuments={documents}
        documentsToUpload={documents_attributes}
        documentType={'Document::DecisionHomologation'}
        handleChange={onChange}
        label={'Contrat de licence signé'}
      />
    </ScrollablePanel>
  );
};

const target_api = 'api_home_plus';

const ApiHomePlus = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="dashboard">
    <Nav
      logo={{
        src: `/images/${API_ICONS[target_api]}`,
        alt: `Logo ${TARGET_API_LABELS[target_api]}`,
        url: 'https://api.gouv.fr/producteurs/urssaf',
      }}
      navLinks={[
        { id: 'head', label: 'Formulaire', style: { fontWeight: 'bold' } },
        { id: 'organisation', label: 'Organisation' },
        { id: 'modeles-preremplis', label: 'Modèles pré-remplis' },
        { id: 'description', label: 'Description' },
        { id: 'donnees', label: 'Données' },
        { id: 'cadre-juridique', label: 'Cadre juridique' },
        { id: 'donnees-personnelles', label: 'Données personnelles' },
        { id: 'contacts-moe', label: 'L’équipe' },
        { id: 'cgu', label: "Modalités d'utilisation" },
        { id: 'licence', label: 'Licence' },
      ]}
      contactInformation={[
        {
          email: 'contact@api.gouv.fr',
          label: 'Nous contacter',
          subject: `Contact%20via%20datapass.api.gouv.fr%20-%20${encodeURIComponent(
            TARGET_API_LABELS[target_api]
          )}`,
        },
      ]}
    />
    <div className="main">
      <Form
        enrollmentId={enrollmentId}
        target_api={target_api}
        title={`Demande d’accès ${TARGET_API_LABELS[target_api]}`}
        DemarcheDescription={DemarcheDescription}
        demarches={demarches}
      >
        <OrganisationSection />
        <DemarcheSection />
        <DescriptionSection />
        <DonneesSection availableScopes={availableScopes} />
        <CadreJuridiqueSection
          CadreJuridiqueDescription={CadreJuridiqueDescription}
        />
        <DonneesPersonnellesSection />
        <MiseEnOeuvreSection
          sectionTitle={'L’équipe du projet'}
          MiseEnOeuvreDescription={() => null}
          initialContacts={contacts}
        />
        <ModaliteUtilisationSection />
        <ContratDeLicenceSection />
      </Form>
    </div>
  </div>
);

ApiHomePlus.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

ApiHomePlus.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default ApiHomePlus;
