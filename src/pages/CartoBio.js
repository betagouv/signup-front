import React from 'react';
import PropTypes from 'prop-types';

import Form from '../components/Form';
import Nav from '../components/Nav';
import OrganisationSection from '../components/form-sections/OrganisationSection';
import DescriptionSection from '../components/form-sections/DescriptionSection';
import MiseEnOeuvreSection from '../components/form-sections/MiseEnOeuvreSection';
import CguSection from '../components/form-sections/CguSection';
import { API_ICONS, TARGET_API_LABELS } from '../lib/api';
import DonneesCartoBioSection from '../components/form-sections/cartobio-sections/DonneesCartoBioSection';
import CartoBioAdditionalAgreements from '../components/form-sections/CguSection/CartoBioAdditionalAgreements';

const CartoBio = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="dashboard">
    <Nav
      logo={{
        src: `/images/${API_ICONS.cartobio}`,
        alt: `Logo ${TARGET_API_LABELS.cartobio}`,
        url: 'https://cartobio.org/',
      }}
      navLinks={[
        { id: 'head', label: 'Formulaire', style: { fontWeight: 'bold' } },
        { id: 'organisation', label: 'Organisation' },
        { id: 'description', label: 'Description' },
        { id: 'cartobio-donnees', label: 'Données' },
        { id: 'contacts-moe', label: 'Mise en œuvre' },
        { id: 'cgu', label: "Modalités d'utilisation" },
      ]}
      contactInformation={[
        {
          email: 'cartobio@beta.gouv.fr',
          label: 'Nous contacter',
          subject: 'Contact%20via%20datapass.api.gouv.fr',
        },
      ]}
    />
    <div className="main">
      <Form
        enrollmentId={enrollmentId}
        target_api="cartobio"
        title="Demande d'accès à l'API CartoBio - Territoires"
      >
        <OrganisationSection />
        <DescriptionSection />
        <DonneesCartoBioSection />
        <MiseEnOeuvreSection />
        <CguSection
          cguLink="/docs/Modele_Engagement_de_confidentialite_-_CartoBio.pdf"
          AdditionalCguContent={CartoBioAdditionalAgreements}
        />
      </Form>
    </div>
  </div>
);

CartoBio.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

CartoBio.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default CartoBio;
