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
import UniquenessWarningNotification from '../components/Form/UniquenessWarningNotification';
import HasNextEnrollmentsNotification from '../components/Form/HasNextEnrollmentsNotification';
import Quote from '../components/Form/components/Quote';
import { availableScopes as franceConnectAvailableScopes } from './FranceConnect';
import YesNoRadioInput from '../components/Form/components/YesNoRadioInput';
import DateInput from '../components/Form/components/DateInput';
import TextInput from '../components/Form/components/TextInput';

const DemarcheDescription = () => (
  <div className="notification grey">
    <p>
      Pour implémenter FranceConnect sur votre site en ligne, vous devez obtenir
      une habilitation. L’accès à ce service n’est disponible que si vous êtes
      une administration ou une entreprise prestataire d’une administration ou
      ayant une délégation de service public.
    </p>
    <p>
      À noter qu'une seule demande FranceConnect par organisation sera
      subventionnée. La seconde demande sera systématiquement refusée. Aussi
      merci de privilégier une utilisation sur un portail englobant plusieurs
      services plutôt que sur un service spécifique.
    </p>
  </div>
);

// there is no actual demarche choice in this form
// but we want some fields to be set by default
const demarches = {
  default: {
    label: 'Demande Libre',
    state: {
      fondement_juridique_title: 'arrêté du 8 novembre 2018',
      fondement_juridique_url:
        'https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000037611479&categorieLien=id',
    },
  },
};

const contacts = {
  metier: {
    heading: 'Porteur de projet',
    description: (
      <p>
        Cette personne sera le contact privilégié par la DINUM pour faciliter la
        mise en place du projet.
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
        Cette personne recevra les accès techniques par mail. Le numéro de
        téléphone doit être un numéro de téléphone mobile. Il sera utilisé pour
        envoyer un code d'accès. Le responsable technique peut être le contact
        technique de votre prestataire. Attention, ce courrier peut parfois
        passer en «&nbsp;courriers indésirables&nbsp;».
      </p>
    ),
    family_name: '',
    given_name: '',
    email: '',
    phone_number: '',
    display_mobile_phone_label: true,
  },
  comptable: {
    heading: 'Contact comptable',
    description: (
      <p>
        Nous contacterons cette personne pour établir les modalités de versement
        de la subvention.
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
    <p>
      Pour pouvoir bénéficier du raccordement à FranceConnect, le cadre légal et
      réglementaire qui s'applique à votre entité (administration ou entreprise)
      doit permettre à la DINUM de lui transmettre des données d'identité.
    </p>
    <p>
      Si vous êtes une administration, vous pouvez laisser ici la mention de{' '}
      <a
        href="https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000037611479&categorieLien=id"
        target="_blank"
        rel="noopener noreferrer"
      >
        l'arrêté du 8 novembre 2018
      </a>
      .
    </p>
    <p>
      Attention cette base légale ne concerne que les administrations ayant une
      nécessité légale d'identification des personnes. Si vous n'êtes pas
      concerné par ce cas, veuillez préciser votre base légale.
    </p>
  </Quote>
);

const AdditionalMiseEnOeuvreContent = ({
  disabled,
  onChange,
  additional_content: {
    utilisation_franceconnect_autre_projet = '',
    date_integration = '',
    type_de_depenses = '',
  },
}) => (
  <>
    <YesNoRadioInput
      label="Votre collectivité utilise-t-elle déjà FranceConnect pour d'autres de ses services en ligne ?"
      name="additional_content.utilisation_franceconnect_autre_projet"
      value={utilisation_franceconnect_autre_projet}
      disabled={disabled}
      onChange={onChange}
    />
    <DateInput
      label="A quelle date prévoyez-vous d'avoir achevé l'intégration de l'identification FranceConnect sur le service en ligne visé ?"
      name="additional_content.date_integration"
      value={date_integration}
      disabled={disabled}
      onChange={onChange}
    />
    <TextInput
      label="Indiquer les types de dépenses prévues de financer grâce à la subvention accordée ?"
      name="additional_content.type_de_depenses"
      placeholder="paiement du prestataire, paiement de l'éditeur, etc."
      value={type_de_depenses}
      disabled={disabled}
      onChange={onChange}
    />
  </>
);

const FranceRelanceFc = ({
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
        target_api="francerelance_fc"
        title="Demande d'habilitation juridique à FranceRelance - Guichet FranceConnect"
        DemarcheDescription={DemarcheDescription}
        demarches={demarches}
      >
        <UniquenessWarningNotification />
        <HasNextEnrollmentsNotification enrollmentId={enrollmentId} />
        <OrganisationSection />
        <DescriptionSection
          intitulePlaceholder="« Se connecter au portail famille de ma ville »"
          descriptionPlaceholder="« Permettre de faciliter la connexion au portail famille de ma ville sans demander de document papier aux usagers »"
        />
        <DonneesSection availableScopes={franceConnectAvailableScopes} />
        <CadreJuridiqueSection
          CadreJuridiqueDescription={CadreJuridiqueDescription}
        />
        <DonneesPersonnellesSection dataRetentionPeriodHelper="À compter de la cessation de la relation contractuelle" />
        <MiseEnOeuvreSection
          initialContacts={contacts}
          MiseEnOeuvreDescription={() => null}
          AdditionalMiseEnOeuvreContent={AdditionalMiseEnOeuvreContent}
        />
        <CguSection
          cguLink="https://partenaires.franceconnect.gouv.fr/cgu"
          AdditionalCguContent={FcHasAlternativeAuthenticationMethod}
        />
      </Form>
    </div>
  </div>
);

FranceRelanceFc.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

FranceRelanceFc.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default FranceRelanceFc;
