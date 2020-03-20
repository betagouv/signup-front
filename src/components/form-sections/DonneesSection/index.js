import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { groupBy, isEmpty, zipObject } from 'lodash';
import { ScrollablePanel } from '../../Scrollable';
import Scopes from './Scopes';
import { FormContext } from '../../Form';
import UseCase from './UseCases';

const DonneesSection = ({
  DonneesDescription = () => null,
  AdditionalRgpdAgreement = () => null,
  availableScopes,
  useCases = [],
}) => {
  const {
    disabled,
    onChange,
    enrollment: { additional_content = {}, scopes = {} },
  } = useContext(FormContext);

  if (isEmpty(scopes)) {
    onChange({
      target: {
        name: 'scopes',
        value: zipObject(
          availableScopes.map(({ value }) => value),
          availableScopes.map(
            ({ mandatory, checkedByDefault }) =>
              !!mandatory || !!checkedByDefault
          )
        ),
      },
    });

    return null;
  }

  const groupTitleScopesGroup = groupBy(
    availableScopes,
    e => e.groupTitle || 'default'
  );

  return (
    <ScrollablePanel scrollableId="donnees">
      <h2>Les données dont vous avez besoin</h2>
      <DonneesDescription />
      <AdditionalRgpdAgreement
        disabled={disabled}
        onChange={onChange}
        additional_content={additional_content}
      />
      <br />
      {!isEmpty(useCases) && (
        <UseCase availableScopes={availableScopes} useCases={useCases} />
      )}
      <p>
        {isEmpty(useCases)
          ? 'Sélectionnez les données nécessaires à votre cas d’usage :'
          : 'Liste des données correspondantes :'}
      </p>
      {Object.keys(groupTitleScopesGroup).map(group => (
        <Scopes
          key={group}
          title={group === 'default' ? null : group}
          scopes={groupTitleScopesGroup[group]}
          selectedScopes={scopes}
          disabledApplication={disabled}
          handleChange={onChange}
        />
      ))}
    </ScrollablePanel>
  );
};

DonneesSection.propTypes = {
  DonneesDescription: PropTypes.func,
  AdditionalRgpdAgreement: PropTypes.func,
  availableScopes: PropTypes.array.isRequired,
};

export default DonneesSection;
