import React from 'react';
import PropTypes from 'prop-types';

import { API_ICONS, TARGET_API_LABELS } from '../lib/api';

import Form from '../components/Form';
import Nav from '../components/Nav';
import FcHasAlternativeAuthenticationMethod from '../components/form-sections/CguSection/FcHasAlternativeAuthenticationMethod';
import OrganisationSection from '../components/form-sections/OrganisationSection';
import DescriptionSection from '../components/form-sections/DescriptionSection';
import DonneesSection from '../components/form-sections/DonneesSection';
import CadreJuridiqueSection from '../components/form-sections/CadreJuridiqueSection';
import DonneesPersonnellesSection from '../components/form-sections/DonneesPersonnellesSection';
import MiseEnOeuvreSection from '../components/form-sections/MiseEnOeuvreSection';
import CguSection from '../components/form-sections/CguSection';
import HasNextEnrollmentsNotification from '../components/Form/HasNextEnrollmentsNotification';
import Quote from '../components/Form/components/Quote';

const DemarcheDescription = () => (
  <div className="notification grey">
    <p>
      Pour implémenter FranceConnect sur votre site en ligne, vous devez obtenir
      une habilitation. L’accès à ce service n’est pour l’instant disponible que
      si vous êtes:
    </p>
    <ul>
      <li>une administration</li>
      <li>
        une entreprise prestataire d’une administration ou ayant une délégation
        de service public
      </li>
      <li>
        un partenaire privé du service public de changement d'adresse en ligne :
        fournisseurs d'énergie, d'eau, opérateurs de communications
        électroniques et services postaux
      </li>
      <li>
        un organisme délivrant des prestations répondant à des obligations
        légales (assurances, banques)
      </li>
      <li>
        une entreprise proposant des services dont l'usage impose la
        vérification de l'identité ou d'un de ses attributs (majorité légale par
        exemple)
      </li>
    </ul>
    <p>
      À la clé ? La garantie de transactions sécurisées grâce au dispositif
      FranceConnect. Les utilisateurs quant à eux, gagneront en facilité d'accès
      à ces nouveaux services auxquels ils pourront se connecter via
      FranceConnect, sans avoir à créer un compte et un mot de passe.
    </p>
  </div>
);

const contacts = {
  technique: {
    heading: 'Responsable technique',
    description: (
      <p>
        Cette personne recevra les accès techniques par mail. Le numéro de
        téléphone doit être un numéro de téléphone mobile. Il sera utilisé pour
        envoyer un code d'accès. Le responsable technique peut être le contact
        technique de votre prestataire. Attention, ce courrier peut parfois
        passer en «&nbsp;courriers indésirables&nbsp;».
      </p>
    ),
    email: '',
    phone_number: '',
    display_mobile_phone_label: true,
  },
};

const CadreJuridiqueDescription = () => (
  <Quote>
    <p>
      Pour pouvoir bénéficier du raccordement à FranceConnect, le cadre légal et
      réglementaire qui s'applique à votre entité (administration ou entreprise)
      doit permettre à la DINUM de lui transmettre des données d'identité.
    </p>
    <ul>
      <li>
        Si vous êtes une <b>administration</b>, vous pouvez citer ici{' '}
        <a
          href="https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000037611479&categorieLien=id"
          target="_blank"
          rel="noopener noreferrer"
        >
          l'arrêté du 8 novembre 2018
        </a>
        . N'oubliez pas de justifier la nécessité d'identification de la
        personne dans le champs de description de votre cas d'usage.{' '}
      </li>
      <li>
        Si vous êtes une <b>entreprise</b>, vous devez citer le cadre légal et
        réglementaire qui s'applique à votre entité.
      </li>
    </ul>
  </Quote>
);

const availableScopes = [
  {
    value: 'family_name',
    label: 'Nom de naissance',
    groupTitle: 'Identité pivot :',
  },
  {
    value: 'given_name',
    label: 'Prénoms',
    groupTitle: 'Identité pivot :',
  },
  {
    value: 'birthdate',
    label: 'Date de naissance',
    triggerWarning: true,
    groupTitle: 'Identité pivot :',
  },
  {
    value: 'birthplace',
    label: 'Ville de naissance',
    triggerWarning: true,
    groupTitle: 'Identité pivot :',
  },
  {
    value: 'birthcountry',
    label: 'Pays de naissance',
    triggerWarning: true,
    groupTitle: 'Identité pivot :',
  },
  {
    value: 'gender',
    label: 'Sexe',
    triggerWarning: true,
    groupTitle: 'Identité pivot :',
  },
  {
    value: 'preferred_username',
    label: "Nom d'usage",
    triggerWarning: true,
    warningType: 'fc_incomplete',
    groupTitle: 'Autres données :',
  },
  {
    value: 'email',
    label: 'Adresse électronique',
    triggerWarning: true,
    groupTitle: 'Autres données :',
  },
  {
    value: 'openid',
    label: 'Identifiant technique',
    mandatory: true,
    comment: '"sub" de l\'utilisateur au format OpenIDConnect',
    groupTitle: 'Donnée technique :',
  },
];

const FranceConnect = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="dashboard">
    <Nav
      logo={{
        src: `/images/${API_ICONS.franceconnect}`,
        alt: `Logo ${TARGET_API_LABELS.franceconnect}`,
        url: 'https://franceconnect.gouv.fr/',
      }}
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
          email: 'support.usagers@franceconnect.gouv.fr',
          label: 'Particuliers, nous contacter',
          subject: 'Contact%20via%20datapass.api.gouv.fr',
        },
        {
          email: 'support.partenaires@franceconnect.gouv.fr',
          label: 'Entreprises, nous contacter',
          subject: 'Contact%20via%20datapass.api.gouv.fr',
        },
        {
          email: 'support.partenaires@franceconnect.gouv.fr',
          label: 'Administrations, nous contacter',
          subject: 'Contact%20via%20datapass.api.gouv.fr',
        },
      ]}
    />
    <div className="main">
      <Form
        enrollmentId={enrollmentId}
        target_api="franceconnect"
        title="Demande d'habilitation juridique à FranceConnect"
        DemarcheDescription={DemarcheDescription}
      >
        <HasNextEnrollmentsNotification enrollmentId={enrollmentId} />
        <OrganisationSection />
        <DescriptionSection
          intitulePlaceholder="« Se connecter au portail famille de ma ville »"
          descriptionPlaceholder="« Permettre de faciliter la connexion au portail famille de ma ville sans demander de document papier aux usagers »"
        />
        <DonneesSection availableScopes={availableScopes} />
        <CadreJuridiqueSection
          CadreJuridiqueDescription={CadreJuridiqueDescription}
        />
        <DonneesPersonnellesSection dataRetentionPeriodHelper="À compter de la cessation de la relation contractuelle" />
        <MiseEnOeuvreSection initialContacts={contacts} />
        <CguSection
          cguLink="https://partenaires.franceconnect.gouv.fr/cgu"
          AdditionalCguContent={FcHasAlternativeAuthenticationMethod}
        />
      </Form>
    </div>
  </div>
);

FranceConnect.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

FranceConnect.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default FranceConnect;
