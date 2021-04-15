import React from 'react';
import PropTypes from 'prop-types';

import Form from '../components/templates/Form';
import Nav from '../components/organisms/Nav';
import OrganisationSection from '../components/organisms/form-sections/OrganisationSection';
import DescriptionSection from '../components/organisms/form-sections/DescriptionSection';
import MiseEnOeuvreSection from '../components/organisms/form-sections/MiseEnOeuvreSection';
import { API_ICONS, TARGET_API_LABELS } from '../lib/api';
import DonneesCartoBioSection from '../components/organisms/form-sections/cartobio-sections/DonneesCartoBioSection';
import CartoBioAdditionalAgreements from '../components/organisms/form-sections/cartobio-sections/CartoBioAdditionalAgreements';

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
        { id: 'cgu', label: 'Modalités d’utilisation' },
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
        title="Demande d’accès à l’API CartoBio - Territoires"
      >
        <OrganisationSection />
        <DescriptionSection descriptionHelper="Dites-nous en quoi les données géographiques vous permettent de réaliser vos missions ? Quelle sont-elles ?" />
        <DonneesCartoBioSection />
        <MiseEnOeuvreSection />
        <CartoBioAdditionalAgreements />
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
