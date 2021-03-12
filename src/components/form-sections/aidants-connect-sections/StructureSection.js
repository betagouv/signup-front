import React, { useContext } from 'react';
import { FormContext } from '../../Form';
import { ScrollablePanel } from '../../Scrollable';
import TextInput from '../../Form/components/TextInput';
import TextAreaInput from '../../Form/components/TextAreaInput';
import Quote from '../../Form/components/Quote';
import OrWrapper from '../../Form/components/OrWrapper';
import FileInput from '../../Form/components/FileInput';
import RadioInput from '../../Form/components/RadioInput';
import YesNoRadioInput from '../../Form/components/YesNoRadioInput';

export const StructureSection = () => {
  const {
    disabled,
    onChange,
    enrollment: {
      intitule = '',
      description = '',
      documents = [],
      documents_attributes = [],
      additional_content: {
        organization_type = '',
        organization_address = '',
        organization_postal_code = '',
        organization_website = '',
        associated_public_organisation = '',
        participation_reseau = null,
        nom_reseau = '',
      },
    },
  } = useContext(FormContext);

  return (
    <ScrollablePanel scrollableId="structure">
      <h2>Description de votre structure</h2>
      <TextInput
        label="Nom de la structure"
        meta="Cette information peut être rendue publique."
        name="intitule"
        value={intitule}
        disabled={disabled}
        onChange={onChange}
      />
      <RadioInput
        label="Type de structure"
        options={[
          { id: 'ccas', label: 'CCAS' },
          { id: 'centre-social', label: 'Centre social' },
          { id: 'secretariat-mairie', label: 'Secrétariat de mairie' },
          {
            id: 'maisons-departementales-solidarites',
            label: 'Maison départementale des solidarités',
          },
          { id: 'mediatheque', label: 'Médiathèque' },
          {
            id: 'autre-guichet',
            label: 'Autre guichet d’accueil de service public de proximité',
          },
          {
            id: 'guichet-accueil-osp',
            label:
              'Guichet d’accueil d’opérateur de service public (CAF, Pôle Emploi, etc.)',
          },
          {
            id: 'association',
            label:
              'Autre association d’accompagnement des publics ou de médiation numérique',
          },
          {
            id: 'structure-medico-sociale',
            label: 'Structure médico-sociale (CSAPA, CHU, CMS)',
          },
          { id: 'independant', label: 'Indépendant' },
        ]}
        name="additional_content.organization_type"
        value={organization_type}
        disabled={disabled}
        onChange={onChange}
      />
      <TextInput
        label="Adresse de la structure si différente de celle de l'organisation"
        name="additional_content.organization_address"
        value={organization_address}
        disabled={disabled}
        onChange={onChange}
      />
      <TextInput
        label="Code postal de la structure si différent de celui de l'organisation"
        name="additional_content.organization_postal_code"
        value={organization_postal_code}
        disabled={disabled}
        onChange={onChange}
      />
      <YesNoRadioInput
        label={
          <>
            Participez-vous à un réseau régional ou local (ex : PIMMS, EPN,
            etc.) ?
          </>
        }
        name="additional_content.participation_reseau"
        value={participation_reseau}
        disabled={disabled}
        onChange={onChange}
      />
      <TextInput
        label="Si oui, lequel ?"
        name="additional_content.nom_reseau"
        value={nom_reseau}
        disabled={disabled}
        onChange={onChange}
      />
      <TextAreaInput
        label="Description des missions de votre structure"
        name="description"
        value={description}
        disabled={disabled}
        onChange={onChange}
      />
      <TextInput
        label="Site web de votre structure"
        name="additional_content.organization_website"
        value={organization_website}
        disabled={disabled}
        onChange={onChange}
      />
      <Quote>
        <p>
          Si vous travaillez avec une administration ou un établissement publics
          (prestation, délégation de service public, subvention publique, etc.),
          merci de renseigner l'un des champs suivants :
        </p>
      </Quote>
      <OrWrapper>
        <TextInput
          label="Renseigner l'administration avec laquelle vous travaillez"
          name="additional_content.associated_public_organisation"
          value={associated_public_organisation}
          disabled={disabled}
          onChange={onChange}
        />
        <FileInput
          label="Téléverser un document"
          documentType={'Document::DelegationServicePublic'}
          uploadedDocuments={documents}
          documentsToUpload={documents_attributes}
          disabled={disabled}
          handleChange={onChange}
        />
      </OrWrapper>
    </ScrollablePanel>
  );
};

export default StructureSection;
