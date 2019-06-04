import React from 'react';
import PropTypes from 'prop-types';

const { REACT_APP_OAUTH_HOST: OAUTH_HOST } = process.env;

const OrganizationPrompt = ({
  selectedOrganizationId,
  onSelect,
  organizations,
}) => {
  const handleChange = ({ target: { value } }) => onSelect(parseInt(value));

  // TODO add a way to close the modal without selection

  return (
    <div
      className="modal__backdrop"
      id="modal"
      style={{ display: 'flex' }}
      // we use this no op function to close the modal
      onClick={() => onSelect(selectedOrganizationId)}
    >
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="form__group">
          <fieldset>
            <legend>
              Sélectionnez l'organisation à associer à cette demande&nbsp;:
            </legend>
            {organizations.map(({ id, siret }) => (
              <div key={id}>
                <input
                  type="radio"
                  id={id}
                  value={id}
                  checked={id === selectedOrganizationId}
                  // Use onClick instead of onChange because it allows to
                  // handle clicks on the already selected value.
                  onClick={handleChange}
                  // as there is no onChange, react wants readOnly attribute
                  readOnly
                />
                <label htmlFor={id} className="label-inline">
                  {siret}
                </label>
              </div>
            ))}
          </fieldset>
          <div>
            <a href={`${OAUTH_HOST}/users/join-organization`}>
              Faire une demande pour une autre organisation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

OrganizationPrompt.propTypes = {
  selectedOrganizationId: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
  organizations: PropTypes.array.isRequired,
};

OrganizationPrompt.defaultProps = {
  selectedOrganizationId: null,
};

export default OrganizationPrompt;
