import React, { useContext, useState, useEffect, useCallback } from 'react';
import { isEmpty } from 'lodash';
import { UserContext } from '../../UserContext';
import { getOrganizationInformation } from '../../../lib/services';
import { isValidNAFCode } from '../../../lib';
import './index.css';
import OrganizationPrompt from './OrganizationPrompt';
import EditIcon from '../../icons/edit';
import { ScrollablePanel } from '../../Scrollable';
import { FormContext } from '../../Form';

const Index = () => {
  const {
    disabled,
    isUserEnrollmentLoading,
    onChange,
    enrollment: { organization_id = null, siret = '', target_api },
  } = useContext(FormContext);

  const [title, setTitle] = useState('');
  const [adresse, setAdresse] = useState('');
  const [ville, setVille] = useState('');
  const [activite, setActivite] = useState('');
  const [isOrganizationInfoLoading, setIsOrganizationInfoLoading] = useState(
    false
  );
  const [
    showOrganizationInfoNotFound,
    setShowOrganizationInfoNotFound,
  ] = useState(false);
  const [showOrganizationInfoError, setShowOrganizationInfoError] = useState(
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
      setShowOrganizationInfoNotFound(false);
      setShowOrganizationInfoError(false);
    } catch (e) {
      setTitle('');
      setAdresse('');
      setVille('');
      setActivite('');
      setIsOrganizationInfoLoading(false);
      setShowOrganizationInfoNotFound(false);
      setShowOrganizationInfoError(false);
      if (e.response && e.response.status === 404) {
        setShowOrganizationInfoNotFound(true);
      } else {
        setShowOrganizationInfoError(true);
      }
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
    if (
      !isUserEnrollmentLoading &&
      !disabled &&
      !organization_id &&
      !isEmpty(user.organizations)
    ) {
      updateOrganizationInfo({
        organization_id: user.organizations[0].id,
        siret: user.organizations[0].siret,
      });
    }
  }, [
    isUserEnrollmentLoading,
    organization_id,
    disabled,
    updateOrganizationInfo,
    user,
  ]);

  useEffect(() => {
    if (siret) {
      fetchOrganizationInfo({ siret });
    }
  }, [siret]);

  const onOrganizationChange = new_organization_id => {
    setShowPrompt(false);

    if (!isEmpty(user.organizations)) {
      updateOrganizationInfo({
        organization_id: new_organization_id,
        siret: user.organizations.find(o => o.id === new_organization_id).siret,
      });
    }
  };

  return (
    <ScrollablePanel
      isLoading={isUserEnrollmentLoading || isOrganizationInfoLoading}
      scrollableId="organisation"
    >
      <h2>Organisation à l'origine de la demande</h2>
      {activite && !isValidNAFCode(target_api, activite) && (
        <div className="form__group">
          <div className="notification warning">
            Votre organisme ne semble pas être éligible
          </div>
        </div>
      )}
      {showOrganizationInfoNotFound && (
        <div className="form__group">
          <div className="notification warning">
            Cet établissement est fermé ou le SIRET est invalide.
          </div>
        </div>
      )}
      {showOrganizationInfoError && (
        <div className="form__group">
          <div className="notification error">
            Erreur inconnue lors de la récupération des informations de cet
            établissement.
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
            <EditIcon color="black" />
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
    </ScrollablePanel>
  );
};

export default Index;
