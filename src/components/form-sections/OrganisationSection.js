import React, { useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../UserContext';
import { getOrganizationInformation } from '../../lib/services';
import { isValidNAFCode } from '../../lib/utils';
import './OrganisationSection.css';
import OrganizationPrompt from '../elements/OrganizationPrompt';
import EditIcon from '../icons/edit';
import Spinner from '../icons/spinner';
import { ScrollablePanel } from '../elements/Scrollable';

const OrganisationSection = ({
  isUserEnrollmentLoading = true,
  disabled = false,
  onChange = () => null,
  enrollment: { organization_id = null, siret = '', target_api },
}) => {
  const [title, setTitle] = useState('');
  const [adresse, setAdresse] = useState('');
  const [ville, setVille] = useState('');
  const [activite, setActivite] = useState('');
  const [isOrganizationInfoLoading, setIsOrganizationInfoLoading] = useState(
    false
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

  const updateOrganizationInfo = useCallback(
    ({ organization_id, siret }) => {
      onChange({
        target: {
          name: 'organization_id',
          value: organization_id,
        },
      });
      onChange({
        target: { name: 'siret', value: siret },
      });
    },
    [onChange]
  );

  useEffect(() => {
    // initialize organization_id & siret if needed
    if (!organization_id && !disabled) {
      updateOrganizationInfo({
        organization_id: user.organizations[0].id,
        siret: user.organizations[0].siret,
      });
    }
  }, [organization_id, disabled, updateOrganizationInfo, user]);

  useEffect(() => {
    if (siret) {
      fetchOrganizationInfo({ siret });
    }
  }, [siret]);

  const onOrganizationChange = new_organization_id => {
    setShowPrompt(false);

    updateOrganizationInfo({
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
    <ScrollablePanel scrollableId="organisation">
      <h2>Organisation à l'origine de la demande</h2>
      {!isUserEnrollmentLoading && (
        <>
          {activite && !isValidNAFCode(target_api, activite) && (
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

          {!disabled && !isLoading && showPrompt && (
            <OrganizationPrompt
              selectedOrganizationId={organization_id}
              onSelect={onOrganizationChange}
              organizations={user.organizations}
            />
          )}
        </>
      )}
    </ScrollablePanel>
  );
};

OrganisationSection.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  enrollment: PropTypes.shape({
    target_api: PropTypes.string,
    organization_id: PropTypes.number,
    siret: PropTypes.string,
  }),
};

export default OrganisationSection;
