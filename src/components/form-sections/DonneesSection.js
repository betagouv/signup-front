import React from 'react';
import PropTypes from 'prop-types';
import { groupBy, isEmpty, zipObject } from 'lodash';
import { ScrollablePanel } from '../elements/Scrollable';
import Scopes from '../form/Scopes';

const DonneesSection = ({
  DonneesDescription = () => null,
  AdditionalRgpdAgreement = () => null,
  availableScopes,
  disabled = false,
  onChange = () => null,
  enrollment: { additional_content = {}, scopes = {} },
}) => {
  if (isEmpty(scopes)) {
    onChange({
      target: {
        name: 'scopes',
        value: zipObject(
          availableScopes.map(({ name }) => name),
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
      {Object.keys(groupTitleScopesGroup).map(group => (
        <Scopes
          key={group}
          title={
            group === 'default'
              ? 'Sélectionnez les données nécessaires à votre cas d’usage'
              : group
          }
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
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  enrollment: PropTypes.shape({
    additional_content: PropTypes.object,
    scopes: PropTypes.object,
  }),
};

export default DonneesSection;
