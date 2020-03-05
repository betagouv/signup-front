import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Contact } from './Contact';
import { ScrollablePanel } from '../../Scrollable';
import { FormContext } from '../../Form';

const Index = ({
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
        {/*
          mind that there might be other legacy contact type present in production database that we
          do not want to display here
        */}
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

Index.propTypes = {
  AdditionalMiseEnOeuvreContent: PropTypes.func,
  initialContacts: PropTypes.shape(contactPropTypesShape),
};

export default Index;
