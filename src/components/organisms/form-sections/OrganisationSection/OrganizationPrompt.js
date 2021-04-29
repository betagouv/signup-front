import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AriaModal from '@justfixnyc/react-aria-modal';
import { collectionWithKeyToObject } from '../../../../lib';
import { isEmpty } from 'lodash';
import { getCachedOrganizationInformationPool } from '../../../../services/external';

const { REACT_APP_BACK_HOST: BACK_HOST } = process.env;

const OrganizationPrompt = ({
  selectedOrganizationId,
  onSelect,
  onClose,
  organizations,
}) => {
  const handleChange = ({ target: { value } }) => onSelect(parseInt(value));

  const [siretToNomRaisonSociale, setSiretToNomRaisonSociale] = useState(
    collectionWithKeyToObject(organizations.map(({ siret }) => ({ id: siret })))
  );
  useEffect(() => {
    const fetchCachedOrganizationInformationPool = async organizations => {
      try {
        const organizationInformationPool = await getCachedOrganizationInformationPool(
          organizations.map(({ siret }) => siret)
        );
        const organizationInformationPoolWithKey = organizationInformationPool.map(
          ({ title, siret }) => ({
            id: siret,
            title,
          })
        );
        setSiretToNomRaisonSociale(
          collectionWithKeyToObject(organizationInformationPoolWithKey)
        );
      } catch (e) {
        // silently fail
      }
    };
    if (!isEmpty(organizations)) {
      fetchCachedOrganizationInformationPool(organizations);
    }
  }, [organizations]);

  return (
    <AriaModal
      titleText="Sélectionnez l’organisation à associer à cette demande :"
      // we use this no op function to close the modal
      onExit={() => onClose()}
      focusDialog={true}
      getApplicationNode={() => document.getElementById('root')}
      scrollDisabled={false}
    >
      <div
        className="modal__backdrop"
        id="modal"
        style={{ display: 'flex' }}
        // we use this no op function to close the modal
        onClick={() => onClose()}
      >
        <div className="modal" onClick={e => e.stopPropagation()}>
          <div className="form__group">
            <fieldset>
              <legend>
                Sélectionnez l’organisation à associer à cette demande&nbsp;:
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
                    {(siretToNomRaisonSociale[siret] &&
                      siretToNomRaisonSociale[siret].title) ||
                      siret}
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
            onClick={() => onClose()}
            aria-label="Conserver l’organisation actuelle"
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
  onClose: PropTypes.func.isRequired,
  organizations: PropTypes.array.isRequired,
};

OrganizationPrompt.defaultProps = {
  selectedOrganizationId: null,
};

export default OrganizationPrompt;
