import React from 'react';
import PropTypes from 'prop-types';

import Form from '../components/Form';
import Nav from '../components/Nav';
import OrganisationSection from '../components/form-sections/OrganisationSection';
import DescriptionSection from '../components/form-sections/DescriptionSection';
import CadreJuridiqueSection from '../components/form-sections/CadreJuridiqueSection';
import CguSection from '../components/form-sections/CguSection';
import MiseEnOeuvreSection from '../components/form-sections/MiseEnOeuvreSection';

const AdditionalMiseEnOeuvreContent = ({
  disabled,
  onChange,
  additional_content: { ips_de_production = '' },
}) => (
  <>
    <div className="form__group">
      <div className="text-quote">
        <p>
          Pour permettre la liaison technique entre votre SI et celui de
          l'agence Bio, vous devez fournir les adresses IP des serveurs qui vont
          communiquer avec l'API Agence Bio.
        </p>
      </div>
    </div>
    <div className="form__group">
      <label htmlFor="ips_de_production">IPs de production</label>
      <input
        type="text"
        onChange={onChange}
        name="additional_content.ips_de_production"
        id="ips_de_production"
        readOnly={disabled}
        value={ips_de_production}
      />
      <small className="card__meta">
        Vous pouvez ajouter plusieurs adresses IP en les séparant par une
        virgule (ex: 111.111.11.11, 111.111.11.12)
      </small>
    </div>
    <br />
  </>
);

const AgenceBio = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="dashboard">
    <Nav
      navLinks={[
        { id: 'head', label: 'Formulaire', style: { fontWeight: 'bold' } },
        { id: 'organisation', label: 'Organisation' },
        { id: 'description', label: 'Description' },
        { id: 'cadre-juridique', label: 'Cadre juridique' },
        { id: 'contacts-moe', label: 'Mise en œuvre' },
        { id: 'cgu', label: "Modalités d'utilisation" },
      ]}
      contactInformation={[
        {
          email: 'contact@api.gouv.fr',
          label: 'Nous contacter',
          subject:
            'Contact%20via%20datapass.api.gouv.fr%20-%20API%20Agence%20Bio',
        },
      ]}
    />
    <div className="main">
      <Form
        enrollmentId={enrollmentId}
        target_api="agence_bio"
        title="Demande d'accès à l'API Agence Bio"
      >
        <OrganisationSection />
        <DescriptionSection />
        <CadreJuridiqueSection />
        <MiseEnOeuvreSection
          AdditionalMiseEnOeuvreContent={AdditionalMiseEnOeuvreContent}
        />
        <CguSection cguLink="https://entreprise.api.gouv.fr/cgu/" />
      </Form>
    </div>
  </div>
);

AgenceBio.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

AgenceBio.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default AgenceBio;
