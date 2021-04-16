import React from 'react';
import PropTypes from 'prop-types';

import Form from '../../components/templates/Form';
import Nav from '../../components/organisms/Nav';
import OrganisationSection from '../../components/organisms/form-sections/OrganisationSection';
import DemarcheSection from '../../components/organisms/form-sections/DemarcheSection';
import DescriptionSection from '../../components/organisms/form-sections/DescriptionSection';
import CadreJuridiqueSection from '../../components/organisms/form-sections/CadreJuridiqueSection';
import CguSection from '../../components/organisms/form-sections/CguSection';
import MiseEnOeuvreSection from '../../components/organisms/form-sections/MiseEnOeuvreSection';
import demarches from './demarches.json';
import Quote from '../../components/atoms/inputs/Quote';
import Helper from '../../components/atoms/Helper';
import { API_ICONS, TARGET_API_LABELS } from '../../lib/api';

const DemarcheDescription = () => (
  <div className="notification grey">
    <p>
      <b>Le Hub d’Échange de l’État (HubEE)</b>, sous la responsabilité de la
      Direction Interministérielle du numérique (DINUM), assure la transmission
      des démarches accessibles depuis « service-public.fr » ou depuis une
      application métier{' '}
      <Helper
        title={
          'La démarche en ligne « CertDc » assurant la transmission du volet ' +
          'administratif du certificat de décès est réalisée depuis ' +
          'l’application Web CertDc mise à disposition des médecins par la ' +
          'Direction Générale de la Santé (DGS).'
        }
      />{' '}
      vers les communes en charge de leurs instructions.
    </p>
    <p>
      Ce service est accessible sur abonnement des communes. Il est gratuit et
      sa mise en œuvre est simple et rapide.
    </p>
    <p>
      Pour l’utiliser, vous devez vous engager à traiter la bonne donnée par le
      bon agent de votre administration et informer correctement l’usager.
    </p>
  </div>
);

const contacts = {
  metier: {
    heading: 'Responsable abonnement',
    description: (
      <p>
        Cette personne disposera des droits d’accès à la gestion des abonnements
        au sein du Hub d’Échange de l’État. Elle sera contactée en cas de
        problème technique.
      </p>
    ),
    family_name: '',
    given_name: '',
    email: '',
    phone_number: '',
    job: '',
  },
  technique: {
    heading: 'Délégué(e) technique',
    description: (
      <>
        <p>
          Ce rôle n’est à définir que si vous optez pour un mode d’accès aux
          démarches via les API.
        </p>
        <p>
          Cette personne disposera des droits d’accès à la gestion des
          abonnements au sein du Hub d'Échange de l'État. Elle pourra également
          être contactée en cas de problème technique.
        </p>
      </>
    ),
    family_name: '',
    given_name: '',
    email: '',
    phone_number: '',
    job: '',
  },
};

const CadreJuridiqueDescription = () => (
  <Quote>
    <p>
      Pour pouvoir bénéficier de l’abonnement aux démarches en ligne, le cadre
      légal et réglementaire doit permettre la transmission des données
      personnelles issues des démarches en ligne à votre commune.
    </p>
    <p>
      Attention cette base légale ne concerne que les communes en charge de
      l’instruction des démarches de « service-public.fr ». Si vous n’êtes pas
      concerné par ce cas, veuillez préciser votre base légale.
    </p>
  </Quote>
);

const target_api = 'hubee';

// Nom de l’application métier
// Nom de l’éditeur
// Numéro de Version
// Pour compléter votre demande, il est nécessaire de joindre un courrier officiel de votre commune

const Hubee = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="dashboard">
    <Nav
      logo={{
        src: `/images/${API_ICONS[target_api]}`,
        alt: `Logo ${TARGET_API_LABELS[target_api]}`,
        url: 'https://www.numerique.gouv.fr/dinum',
      }}
      navLinks={[
        { id: 'head', label: 'Formulaire', style: { fontWeight: 'bold' } },
        { id: 'organisation', label: 'Organisation' },
        { id: 'modeles-preremplis', label: 'Modèles pré-remplis' },
        { id: 'description', label: 'Description' },
        { id: 'cadre-juridique', label: 'Cadre juridique' },
        { id: 'contacts-moe', label: 'L’équipe' },
        { id: 'cgu', label: 'Modalités d’utilisation' },
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
        title="Demande d’abonnement à une démarche en ligne"
        DemarcheDescription={DemarcheDescription}
        demarches={demarches}
      >
        <OrganisationSection />
        <DemarcheSection
          title="Les démarches en ligne auxquelles vous souhaitez abonner votre commune"
          body="Sélectionnez les démarches en lignes auxquelles vous souhaitez abonner votre commune :"
        />
        <DescriptionSection />
        <CadreJuridiqueSection
          CadreJuridiqueDescription={CadreJuridiqueDescription}
        />
        <MiseEnOeuvreSection
          sectionTitle={'L’équipe du projet'}
          MiseEnOeuvreDescription={() => null}
          initialContacts={contacts}
        />
        <CguSection cguLink="https://api.gouv.fr/resources/CGU%20API%20Particulier.pdf" />
      </Form>
    </div>
  </div>
);

Hubee.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

Hubee.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default Hubee;
