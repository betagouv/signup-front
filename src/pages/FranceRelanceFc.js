import React from 'react';
import PropTypes from 'prop-types';

import Form from '../components/templates/Form';
import FcHasAlternativeAuthenticationMethod from '../components/organisms/form-sections/deprecated/CguSection/FcHasAlternativeAuthenticationMethod';
import OrganisationSection from '../components/organisms/form-sections/OrganisationSection';
import DescriptionSection from '../components/organisms/form-sections/deprecated/DescriptionSection';
import DonneesSection from '../components/organisms/form-sections/deprecated/DonneesSection';
import CadreJuridiqueSection from '../components/organisms/form-sections/deprecated/CadreJuridiqueSection';
import DonneesPersonnellesSection from '../components/organisms/form-sections/deprecated/DonneesPersonnellesSection';
import MiseEnOeuvreSection from '../components/organisms/form-sections/MiseEnOeuvreSection';
import CguSection from '../components/organisms/form-sections/deprecated/CguSection';
import UniquenessWarningNotification from '../components/templates/Form/UniquenessWarningNotification';
import HasNextEnrollmentsNotification from '../components/templates/Form/HasNextEnrollmentsNotification';
import Quote from '../components/atoms/inputs/Quote';
import { availableScopes as franceConnectAvailableScopes } from './FranceConnect';
import AboutSection from '../components/organisms/form-sections/francerelance-sections/AboutSection';

const DemarcheDescription = () => (
  <div className="notification grey">
    <p>
      Pour implémenter FranceConnect sur votre site en ligne, vous devez obtenir
      une habilitation. L’accès à ce service n’est disponible que si vous êtes
      une administration ou une entreprise prestataire d’une administration ou
      ayant une délégation de service public.
    </p>
    <p>
      À noter qu’une seule demande FranceConnect par organisation sera
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
      <Quote>
        <p>
          Cette personne sera le contact privilégié par la DINUM pour faciliter
          la mise en place du projet.
        </p>
      </Quote>
    ),
    family_name: '',
    given_name: '',
    email: '',
    phone_number: '',
  },
  technique: {
    heading: 'Responsable technique',
    description: (
      <Quote>
        <p>
          Cette personne recevra les accès techniques par mail. Le numéro de
          téléphone doit être un numéro de téléphone mobile. Il sera utilisé
          pour envoyer un code d’accès. Le responsable technique peut être le
          contact technique de votre prestataire. Attention, ce courrier peut
          parfois passer en « courriers indésirables ».
        </p>
      </Quote>
    ),
    family_name: '',
    given_name: '',
    email: '',
    phone_number: '',
    display_mobile_phone_label: true,
  },
};

const CadreJuridiqueDescription = () => (
  <Quote>
    <p>
      Pour pouvoir bénéficier du raccordement à FranceConnect, le cadre légal et
      réglementaire qui s’applique à votre entité (administration ou entreprise)
      doit permettre à la DINUM de lui transmettre des données d’identité.
    </p>
    <p>
      Si vous êtes une administration, vous pouvez laisser ici la mention de{' '}
      <a
        href="https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000037611479&categorieLien=id"
        target="_blank"
        rel="noopener noreferrer"
      >
        l’arrêté du 8 novembre 2018
      </a>
      .
    </p>
    <p>
      Attention cette base légale ne concerne que les administrations ayant une
      nécessité légale d’identification des personnes. Si vous n’êtes pas
      concerné par ce cas, veuillez préciser votre base légale.
    </p>
  </Quote>
);

const FranceRelanceFc = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <Form
    enrollmentId={enrollmentId}
    target_api="francerelance_fc"
    DemarcheDescription={DemarcheDescription}
    demarches={demarches}
    documentationUrl="https://france-relance.transformation.gouv.fr/e13a-deployer-franceconnect-et-utiliser-les-api-na/"
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
    />
    <AboutSection />
    <CguSection
      cguLink="https://partenaires.franceconnect.gouv.fr/cgu"
      AdditionalCguContent={FcHasAlternativeAuthenticationMethod}
    />
  </Form>
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
