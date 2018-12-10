import React from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import Nav from '../components/Nav';
import CnamFormConfiguration from '../components/form/config/api-droits-cnam';

const IntroDescription = () => (
  <div className="intro">
    <p>
      Dans le cadre du programme « Dites-le nous une fois », visant à simplifier
      les démarches administratives des usagers, l&apos;API Droits CNAM permet
      de récupérer des informations d'assurance maladie des usagers de façon à
      leur éviter la transmission d'information papier.
    </p>
    <p>
      Ce portail permet de faciliter le raccordement du téléservice des
      fournisseurs de service à l&apos;API Droits CNAM.
    </p>
    <p>
      Pour faciliter votre racordement à l'API Droits CNAM, une{' '}
      <a
        href="https://github.com/assurance-maladie-digital/api-droits-fs-exemple-php"
        target="_blank"
        rel="noopener noreferrer"
      >
        API de test
      </a>{' '}
      est à votre disposition.
    </p>
  </div>
);

const DemarcheDescription = () => <React.Fragment />;

const CguDescription = () => <React.Fragment />;

const CadreJuridiqueDescription = () => <React.Fragment />;

const DonneesDescription = () => <React.Fragment />;

const ApiDroitsCnam = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="documentation">
    <Nav isCnam={true} />
    <div className="main-pane">
      <Form
        enrollmentId={enrollmentId}
        form={CnamFormConfiguration}
        isCnam={true}
        IntroDescription={IntroDescription}
        DemarcheDescription={DemarcheDescription}
        CguDescription={CguDescription}
        CadreJuridiqueDescription={CadreJuridiqueDescription}
        DonneesDescription={DonneesDescription}
      />
    </div>
  </div>
);

ApiDroitsCnam.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

ApiDroitsCnam.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default ApiDroitsCnam;
