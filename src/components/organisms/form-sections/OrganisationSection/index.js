import React, { useContext, useState, useEffect, useCallback } from 'react';
import { isEmpty } from 'lodash';
import { UserContext } from '../../UserContext';
import { getCachedOrganizationActivityDetails } from '../../../../services/external';
import { getCachedOrganizationInformation } from '../../../../services/external';
import { isValidNAFCode } from '../../../../lib';
import './index.css';
import OrganizationPrompt from './OrganizationPrompt';
import { ScrollablePanel } from '../../Scrollable';
import { FormContext } from '../../../templates/Form';
import Loader from '../../../atoms/Loader';
import CopyToCliboardButton from '../../../molecules/CopyToCliboardButton';

const { REACT_APP_BACK_HOST: BACK_HOST } = process.env;
const SECTION_LABEL = 'Organisation';
const SECTION_ID = encodeURIComponent(SECTION_LABEL);

const OrganisationSection = () => {
  const {
    disabled,
    isUserEnrollmentLoading,
    onChange,
    enrollment: {
      organization_id = null,
      nom_raison_sociale,
      siret = '',
      target_api,
      user: owner,
    },
  } = useContext(FormContext);

  const [title, setTitle] = useState('');
  const [adresse, setAdresse] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [ville, setVille] = useState('');
  const [activite, setActivite] = useState('');
  const [activiteLabel, setActiviteLabel] = useState('');
  const [isOrganizationInfoLoading, setIsOrganizationInfoLoading] =
    useState(false);
  const [showOrganizationInfoNotFound, setShowOrganizationInfoNotFound] =
    useState(false);
  const [showOrganizationInfoError, setShowOrganizationInfoError] =
    useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const { user, isLoading } = useContext(UserContext);
  const [personalInformation, setPersonalInformation] = useState({});

  useEffect(() => {
    if (isEmpty(owner)) {
      setPersonalInformation(user);
    } else {
      setPersonalInformation(owner);
    }
  }, [owner, user]);

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
    const fetchOrganizationInfo = async (siret) => {
      try {
        setIsOrganizationInfoLoading(true);
        const {
          title,
          activite,
          adresse,
          code_postal,
          ville,
          etat_administratif,
        } = await getCachedOrganizationInformation(siret);

        if (etat_administratif !== 'A') {
          setTitle('');
          setAdresse('');
          setCodePostal('');
          setVille('');
          setActivite('');
          setActiviteLabel('');
          setIsOrganizationInfoLoading(false);
          setShowOrganizationInfoNotFound(true);
          setShowOrganizationInfoError(false);
        } else {
          setTitle(title);
          setAdresse(adresse);
          setCodePostal(code_postal);
          setVille(ville);
          setActivite(activite);
          setIsOrganizationInfoLoading(false);
          setShowOrganizationInfoNotFound(false);
          setShowOrganizationInfoError(false);
        }
      } catch (e) {
        setTitle('');
        setAdresse('');
        setCodePostal('');
        setVille('');
        setActivite('');
        setActiviteLabel('');
        setIsOrganizationInfoLoading(false);
        setShowOrganizationInfoNotFound(false);
        setShowOrganizationInfoError(true);
      }
    };

    if (siret) {
      fetchOrganizationInfo(siret);
    }
  }, [siret]);

  useEffect(() => {
    const fetchOrganizationActivityLabel = async (activite) => {
      try {
        const { message } = await getCachedOrganizationActivityDetails(
          activite
        );
        setActiviteLabel(message);
      } catch (e) {
        setActiviteLabel('Code inconnu');
      }
    };
    if (activite) {
      fetchOrganizationActivityLabel(activite);
    }
  }, [activite]);

  const onOrganizationChange = (new_organization_id) => {
    setShowPrompt(false);

    if (!isEmpty(user.organizations)) {
      updateOrganizationInfo({
        organization_id: new_organization_id,
        siret: user.organizations.find((o) => o.id === new_organization_id)
          .siret,
      });
    }
  };

  return (
    <ScrollablePanel scrollableId={SECTION_ID}>
      <h2>L’organisation</h2>
      <div className="row">
        <div className="card">
          <div className="card__content">
            <h4>Vous êtes :</h4>
            <div className="organization-title">
              <span>
                {personalInformation.given_name}{' '}
                {personalInformation.family_name}
              </span>
              {!disabled && (
                <button>
                  <a
                    className="fr-btn fr-btn--secondary fr-btn--sm fr-fi-edit-line"
                    href={`${BACK_HOST}/api/users/personal-information`}
                    aria-label={`modifier mes informations`}
                  >
                    éditer
                  </a>
                </button>
              )}
            </div>
            <div className="organization-subtitle">
              {personalInformation.email}
              <CopyToCliboardButton textToCopy={personalInformation.email} />
            </div>
            <div className="organization-subtitle">
              {personalInformation.phone_number}
            </div>
            <div className="organization-subtitle">
              {personalInformation.job}
            </div>
          </div>
        </div>
        <div className="card">
          {isUserEnrollmentLoading || isOrganizationInfoLoading ? (
            <Loader />
          ) : (
            <div className="card__content">
              <h4>Vous faites cette demande pour :</h4>
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
                    Erreur inconnue lors de la récupération des informations de
                    cet établissement.
                  </div>
                </div>
              )}
              <div className="organization-title">
                <span>
                  {title || (disabled && nom_raison_sociale)}{' '}
                  <button>
                    <a
                      className="fr-btn fr-btn--sm fr-btn--secondary fr-fi-eye-line"
                      href={`https://annuaire-entreprises.data.gouv.fr/entreprise/${siret}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Plus d’information sur la donnée`}
                    ></a>
                  </button>
                </span>
                {!disabled && (
                  <button
                    title="faire une demande pour une autre organisation"
                    className="fr-btn fr-btn--sm fr-btn--secondary fr-fi-edit-line"
                    onClick={() => setShowPrompt(true)}
                  ></button>
                )}
              </div>
              <div className="organization-subtitle">{adresse}</div>
              <div className="organization-subtitle">
                {codePostal} {ville}
              </div>
              <div className="organization-subtitle">SIRET : {siret}</div>
              <div className="organization-subtitle">
                Code NAF : {activite}{' '}
                {activiteLabel ? '- ' + activiteLabel : null}
              </div>
            </div>
          )}
        </div>

        {!disabled && !isLoading && showPrompt && (
          <OrganizationPrompt
            selectedOrganizationId={organization_id}
            onSelect={onOrganizationChange}
            onClose={() => setShowPrompt(false)}
            organizations={user.organizations}
          />
        )}
      </div>
    </ScrollablePanel>
  );
};

OrganisationSection.sectionLabel = SECTION_LABEL;

export default OrganisationSection;
