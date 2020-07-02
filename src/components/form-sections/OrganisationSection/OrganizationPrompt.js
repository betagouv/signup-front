import React from 'react';
import PropTypes from 'prop-types';
import AriaModal from 'react-aria-modal';

const { REACT_APP_BACK_HOST: BACK_HOST } = process.env;

const OrganizationPrompt = ({
  selectedOrganizationId,
  onSelect,
  organizations,
}) => {
  const handleChange = ({ target: { value } }) => onSelect(parseInt(value));

  return (
    <AriaModal
      titleText="Sélectionnez l'organisation à associer à cette demande :"
      // we use this no op function to close the modal
      onExit={() => onSelect(selectedOrganizationId)}
      focusDialog={true}
      getApplicationNode={() => document.getElementById('root')}
      scrollDisabled={false}
    >
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
                    // Use onClick in addition of onChange because it allows to
                    // handle clicks on the already selected value.
                    onClick={handleChange}
                    onChange={handleChange}
                  />
                  <label htmlFor={id} className="label-inline">
                    {siret}
                  </label>
                </div>
              ))}
            </fieldset>
            <div>
              <a href={`${BACK_HOST}/api/users/join-organization`}>
                Faire une demande pour une autre organisation
              </a>
            </div>
          </div>
          <button
            id="close-warning-modal"
            className="closing_cross"
            onClick={() => onSelect(selectedOrganizationId)}
            aria-label="Conserver l'organisation actuelle"
          >
            ×
          </button>
        </div>
      </div>
    </AriaModal>
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
