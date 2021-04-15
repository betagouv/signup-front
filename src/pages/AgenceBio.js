import React from 'react';
import PropTypes from 'prop-types';

import Form from '../components/templates/Form';
import Nav from '../components/organisms/Nav';
import OrganisationSection from '../components/organisms/form-sections/OrganisationSection';
import DescriptionSection from '../components/organisms/form-sections/DescriptionSection';
import CadreJuridiqueSection from '../components/organisms/form-sections/CadreJuridiqueSection';
import CguSection from '../components/organisms/form-sections/CguSection';
import MiseEnOeuvreSection from '../components/organisms/form-sections/MiseEnOeuvreSection';
import Quote from '../components/atoms/inputs/Quote';
import TextInput from '../components/atoms/inputs/TextInput';

const AdditionalMiseEnOeuvreContent = ({
  disabled,
  onChange,
  additional_content: { ips_de_production = '' },
}) => (
  <>
    <Quote>
      <p>
        Pour permettre la liaison technique entre votre SI et celui de l’agence
        Bio, vous devez fournir les adresses IP des serveurs qui vont
        communiquer avec l’API Agence Bio.
      </p>
    </Quote>
    <TextInput
      label="IPs de production"
      meta={
        <>
          Vous pouvez ajouter plusieurs adresses IP en les séparant par une
          virgule (ex: 111.111.11.11, 111.111.11.12)
        </>
      }
      name="additional_content.ips_de_production"
      value={ips_de_production}
      disabled={disabled}
      onChange={onChange}
    />
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
        { id: 'cgu', label: 'Modalités d’utilisation' },
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
        title="Demande d’accès à l’API Agence Bio"
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
