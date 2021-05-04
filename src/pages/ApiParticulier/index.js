import React from 'react';
import PropTypes from 'prop-types';

import Form from '../../components/templates/Form';
import OrganisationSection from '../../components/organisms/form-sections/OrganisationSection';
import DemarcheSection from '../../components/organisms/form-sections/DemarcheSection';
import DescriptionSection from '../../components/organisms/form-sections/DescriptionSection';
import DonneesSection from '../../components/organisms/form-sections/DonneesSection';
import CadreJuridiqueSection from '../../components/organisms/form-sections/CadreJuridiqueSection';
import CguSection from '../../components/organisms/form-sections/CguSection';
import DonneesPersonnellesSection from '../../components/organisms/form-sections/DonneesPersonnellesSection';
import MiseEnOeuvreSection from '../../components/organisms/form-sections/MiseEnOeuvreSection';
import demarches from './demarches.json';
import Quote from '../../components/atoms/inputs/Quote';

const DemarcheDescription = () => (
  <div className="notification grey">
    <p>
      Pour avoir accès à l’API Particulier, diffusant des données personnelles,
      vous devez obtenir un agrément. L’accès à cette API n’est pour l’instant
      disponible que si vous êtes&nbsp;:
    </p>
    <ul>
      <li>une administration</li>
      <li>
        une entreprise prestataire d’une administration ou ayant une délégation
        de service public
      </li>
    </ul>
    <p>
      Pour utiliser API Particulier, vous devez vous engager à traiter la bonne
      donnée par le bon agent de votre administration et informer correctement
      l’usager.
    </p>
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
    email: '',
    phone_number: '',
  },
};

const CadreJuridiqueDescription = () => (
  <Quote>
    <p>
      Pour pouvoir bénéficier du raccordement à l’API Particulier, le cadre
      légal et réglementaire des fournisseurs de service doit permettre à la
      DINUM de transmettre des données personnelles à votre entité
      administrative.
    </p>
    <p>
      Dans le cas où vous représentez une collectivité, veuillez joindre la
      délibération du conseil municipal explicitant l’usage des données
      demandées.
    </p>
    <p>
      Voici quelques exemples de formulations que vous pouvez faire apparaitre
      dans la délibération :
    </p>
    <ul>
      <li>
        "Le quotient familial se base sur la valeur transmise par la CNAF."
      </li>
      <li>
        "Le quotient familial est calculé par division du revenu fiscal de
        référence par le nombre de parts du foyer."
      </li>
      <li>
        "L’adresse fiscale est collectée afin de vérifier que le demandeur
        réside bien sur la commune de XXX."
      </li>
      <li>
        "La liste des enfants fournie par la CNAF est nécessaire à pré-remplir
        l’inscription aux activités périscolaires."
      </li>
    </ul>
  </Quote>
);

const DonneesDescription = () => (
  <Quote>
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
      nécessaires à votre téléservice. Le non-respect du principe de
      proportionnalité vous expose vis à vis de la CNIL.
    </p>
  </Quote>
);

const availableScopes = [
  {
    value: 'dgfip_avis_imposition',
    label: 'DGFIP - Avis d’imposition',
  },
  {
    value: 'dgfip_adresse',
    label: 'DGFIP - Adresse',
  },
  {
    value: 'cnaf_quotient_familial',
    label: 'CNAF - Quotient familial',
  },
  {
    value: 'cnaf_allocataires',
    label: 'CNAF - Allocataires',
  },
  {
    value: 'cnaf_enfants',
    label: 'CNAF - Enfants',
  },
  {
    value: 'cnaf_adresse',
    label: 'CNAF - Adresse',
  },
];

const target_api = 'api_particulier';

const ApiParticulier = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <Form
    enrollmentId={enrollmentId}
    target_api={target_api}
    DemarcheDescription={DemarcheDescription}
    demarches={demarches}
    contactInformation={[
      {
        email: 'contact@particulier.api.gouv.fr',
        label: 'Nous contacter',
        subject: 'Contact%20via%20datapass.api.gouv.fr',
      },
    ]}
  >
    <OrganisationSection />
    <DemarcheSection />
    <DescriptionSection
      intitulePlaceholder={
        '« Calcul du quotient familial pour la facturation scolaire et périscolaire »'
      }
    />
    <DonneesSection
      availableScopes={availableScopes}
      DonneesDescription={DonneesDescription}
    />
    <CadreJuridiqueSection
      CadreJuridiqueDescription={CadreJuridiqueDescription}
    />
    <DonneesPersonnellesSection />
    <MiseEnOeuvreSection initialContacts={contacts} />
    <CguSection cguLink="https://api.gouv.fr/resources/CGU%20API%20Particulier.pdf" />
  </Form>
);

ApiParticulier.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

ApiParticulier.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default ApiParticulier;
