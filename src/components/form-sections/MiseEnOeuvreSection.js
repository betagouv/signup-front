import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Contact } from '../form/Contact';
import { ScrollablePanel } from '../elements/Scrollable';
import { FormContext } from '../Form';

const MiseEnOeuvreSection = ({
  initialContacts = {},
  AdditionalMiseEnOeuvreContent = () => null,
}) => {
  const {
    disabled,
    onChange,
    enrollment: { contacts, additional_content = {} },
  } = useContext(FormContext);

  // initialize contacts
  if (isEmpty(contacts)) {
    const defaultContacts = {
      technique: {
        heading: 'Responsable technique',
        description: () => (
          <p>
            Cette personne recevra les accès techniques par mail. Le responsable
            technique peut être le contact technique de votre prestataire.
          </p>
        ),
        email: '',
      },
    };

    onChange({
      target: {
        name: 'contacts',
        value: !isEmpty(initialContacts) ? initialContacts : defaultContacts,
      },
    });

    return null;
  }
  return (
    <ScrollablePanel scrollableId="contacts-moe">
      <h2>La mise en œuvre du service</h2>
      <div className="text-quote">
        <p>
          Afin de fluidifier la suite de votre demande merci de renseigner les
          informations suivantes.
        </p>
      </div>
      <br />
      <AdditionalMiseEnOeuvreContent
        disabled={disabled}
        onChange={onChange}
        additional_content={additional_content}
      />
      <div className="row">
        {!isEmpty(contacts.technique) && (
          <Contact
            id={'technique'}
            {...contacts.technique}
            disabled={disabled}
            handleChange={onChange}
          />
        )}
        {!isEmpty(contacts.metier) && (
          <Contact
            id={'metier'}
            {...contacts.metier}
            disabled={disabled}
            handleChange={onChange}
          />
        )}
      </div>
    </ScrollablePanel>
  );
};

const contactPropTypesShape = {
  technique: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.func,
    email: PropTypes.string,
    phone_number: PropTypes.string,
  }),
  metier: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.func,
    email: PropTypes.string,
    phone_number: PropTypes.string,
  }),
};

MiseEnOeuvreSection.propTypes = {
  AdditionalMiseEnOeuvreContent: PropTypes.func,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  initialContacts: PropTypes.shape(contactPropTypesShape),
  enrollment: PropTypes.shape({
    contacts: PropTypes.shape(contactPropTypesShape),
  }),
};

export default MiseEnOeuvreSection;
