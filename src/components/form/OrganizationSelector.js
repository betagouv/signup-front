import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../UserContext';
import { getOrganizationInformation } from '../../lib/services';
import { isValidNAFCode } from '../../lib/utils';
import './OrganizationSelector.css';
import OrganizationPrompt from '../elements/OrganizationPrompt';
import EditIcon from '../icons/edit';
import Spinner from '../icons/spinner';

const OrganizationSelector = ({
  enrollment: { organization_id, siret },
  disabled,
  targetApi,
  handleOrganizationChange,
}) => {
  const [title, setTitle] = useState('');
  const [adresse, setAdresse] = useState('');
  const [ville, setVille] = useState('');
  const [activite, setActivite] = useState('');
  const [isOrganizationInfoLoading, setIsOrganizationInfoLoading] = useState(
    true
  );
  const [showPrompt, setShowPrompt] = useState(false);

  const { user, isLoading } = useContext(UserContext);

  const fetchOrganizationInfo = async ({ siret }) => {
    try {
      setIsOrganizationInfoLoading(true);
      const {
        title,
        activite,
        adresse,
        ville,
      } = await getOrganizationInformation(siret);

      setTitle(title);
      setAdresse(adresse);
      setVille(ville);
      setActivite(activite);
      setIsOrganizationInfoLoading(false);
    } catch (e) {
      setTitle('');
      setAdresse('');
      setVille('');
      setActivite('');
      setIsOrganizationInfoLoading(false);
    }
  };

  useEffect(
    () => {
      // initialize organization_id & siret if needed
      if (!organization_id && !disabled) {
        handleOrganizationChange({
          organization_id: user.organizations[0].id,
          siret: user.organizations[0].siret,
        });
      }
    },
    [organization_id, disabled, handleOrganizationChange, user]
  );

  useEffect(
    () => {
      if (siret) {
        fetchOrganizationInfo({ siret });
      }
    },
    [siret]
  );

  const onOrganizationChange = new_organization_id => {
    setShowPrompt(false);

    handleOrganizationChange({
      organization_id: new_organization_id,
      siret: user.organizations.find(o => o.id === new_organization_id).siret,
    });
  };

  if (isOrganizationInfoLoading) {
    return (
      <div className="organization-selector-loader-container">
        <div className="loader">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <>
      {activite &&
        !isValidNAFCode(targetApi, activite) && (
          <div className="form__group">
            <div className="notification warning">
              Votre organisme ne semble pas être éligible
            </div>
          </div>
        )}

      <div className="organization-title">
        {title}
        {!disabled && (
          <button
            title="faire une demande pour une autre organisation"
            className="light inline-icon-button"
            onClick={() => setShowPrompt(true)}
          >
            <EditIcon />
          </button>
        )}
      </div>
      <div className="organization-subtitle">{adresse}</div>
      <div className="organization-subtitle">{ville}</div>
      <div className="organization-subtitle">SIRET : {siret}</div>
      <div className="organization-subtitle">Code NAF : {activite}</div>

      {!disabled &&
        !isLoading &&
        showPrompt && (
          <OrganizationPrompt
            selectedOrganizationId={organization_id}
            onSelect={onOrganizationChange}
            organizations={user.organizations}
          />
        )}
    </>
  );
};

OrganizationSelector.propTypes = {
  organization_id: PropTypes.number,
  siret: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  targetApi: PropTypes.string.isRequired,
  handleOrganizationChange: PropTypes.func.isRequired,
};

OrganizationSelector.defaultProps = {
  organization_id: null,
  siret: '',
};

export default OrganizationSelector;
