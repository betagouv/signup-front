import React from 'react';
import PropTypes from 'prop-types';

import Form from '../../components/templates/Form';
import OrganisationSection from '../../components/organisms/form-sections/OrganisationSection';
import DemarcheSection from '../../components/organisms/form-sections/DemarcheSection';
import DescriptionSection from '../../components/organisms/form-sections/DescriptionSection';
import CadreJuridiqueSection from '../../components/organisms/form-sections/CadreJuridiqueSection';
import CguSection from '../../components/organisms/form-sections/CguSection';
import MiseEnOeuvreSection from '../../components/organisms/form-sections/MiseEnOeuvreSection';
import demarches from './demarches.json';
import Quote from '../../components/atoms/inputs/Quote';
import Helper from '../../components/atoms/Helper';
import { SolutionLogicielleSection } from '../../components/organisms/form-sections/hubee-sections/SolutionLogicielleSection';

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
          abonnements au sein du Hub d’Échange de l’État. Elle pourra également
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
      La loi n° 78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers
      et aux libertés définit les principes à respecter lors de la collecte, du
      traitement et de la conservation de données personnelles.
    </p>
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

const Hubee = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <Form
    enrollmentId={enrollmentId}
    target_api={target_api}
    title="Demande d’abonnement à une démarche en ligne"
    DemarcheDescription={DemarcheDescription}
    demarches={demarches}
    logoLinkUrl="https://www.numerique.gouv.fr/dinum/"
  >
    <OrganisationSection />
    <DemarcheSection
      title="Les démarches en ligne auxquelles vous souhaitez abonner votre commune"
      body="Sélectionnez les démarches en lignes auxquelles vous souhaitez abonner votre commune :"
    />
    <DescriptionSection
      title="Description du téléservice"
      intituleLabel="Nom du téléservice"
    />
    <CadreJuridiqueSection
      CadreJuridiqueDescription={CadreJuridiqueDescription}
    />
    <MiseEnOeuvreSection
      title={'L’équipe en charge du téléservice'}
      MiseEnOeuvreDescription={() => null}
      initialContacts={contacts}
    />
    <SolutionLogicielleSection />
    <CguSection cguLink="" />
  </Form>
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
