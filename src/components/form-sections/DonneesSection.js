import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _, { groupBy, isEmpty, isString, xor, zipObject } from 'lodash';
import { ScrollablePanel } from '../elements/Scrollable';
import Scopes from '../form/Scopes';
import { FormContext } from '../Form';

const CUSTOM_USE_CASE_LABEL = 'Autre';

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

  const [selectedUseCase, selectUseCase] = useState(null);

  const handleUseCaseChange = useCaseToBeSelected => {
    if (isEmpty(useCases)) {
      return null;
    }

    if (
      isString(useCaseToBeSelected) &&
      useCaseToBeSelected !== CUSTOM_USE_CASE_LABEL
    ) {
      availableScopes.forEach(({ value: scopeValue }) =>
        onChange({
          target: {
            type: 'checkbox',
            checked: useCases
              .find(e => e.label === useCaseToBeSelected)
              .scopes.includes(scopeValue),
            name: `scopes.${scopeValue}`,
          },
        })
      );

      return null;
    }

    availableScopes.forEach(({ value: scopeValue }) =>
      onChange({
        target: {
          type: 'checkbox',
          checked: false,
          name: `scopes.${scopeValue}`,
        },
      })
    );
  };

  useEffect(() => {
    if (isEmpty(useCases)) {
      return undefined;
    }

    // {'a': true, 'b': false, 'c': true} becomes ['a', 'c']
    const selectedScopesAsArray = _(scopes)
      .omitBy(e => !e)
      .keys()
      .value();

    const useCaseToSelect = useCases.find(({ scopes: useCaseScopes }) =>
      isEmpty(xor(selectedScopesAsArray, useCaseScopes))
    );

    selectUseCase(
      isEmpty(useCaseToSelect) ? CUSTOM_USE_CASE_LABEL : useCaseToSelect.label
    );
  }, [scopes, useCases]);

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
        <>
          <fieldset className="vertical">
            <legend>Sélectionnez votre cas d'usage :</legend>
            <div className="row">
              <div className="column">
                {useCases.map(({ label }) => (
                  <div key={label}>
                    <input
                      type="radio"
                      name="radio"
                      id={label}
                      checked={selectedUseCase === label}
                      onChange={() => handleUseCaseChange(label)}
                      disabled={disabled}
                    />
                    <label htmlFor={label} className="label-inline">
                      {label}
                    </label>
                  </div>
                ))}
                <div>
                  <input
                    type="radio"
                    name="radio"
                    id="radio-other"
                    checked={selectedUseCase === CUSTOM_USE_CASE_LABEL}
                    onChange={() => handleUseCaseChange(CUSTOM_USE_CASE_LABEL)}
                    disabled={disabled}
                  />
                  <label htmlFor="radio-other" className="label-inline">
                    {CUSTOM_USE_CASE_LABEL}
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
        </>
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
