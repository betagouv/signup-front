import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../UserContext';
import { getSiretInformation } from '../../lib/services';
import { isValidNAFCode } from '../../lib/utils';

const { REACT_APP_OAUTH_HOST: OAUTH_HOST } = process.env;

const OrganizationSelector = ({
  enrollment: { organization_id, siret },
  disabled,
  targetApi,
  handleOrganizationChange,
}) => {
  const [enseigne, setEnseigne] = useState('');
  const [nomRaisonSociale, setNomRaisonSociale] = useState('');
  const [adresse, setAdresse] = useState('');
  const [activitePrincipale, setActivitePrincipale] = useState('');

  const { user, isLoading } = useContext(UserContext);

  const fetchOrganizationInfo = async ({ siret }) => {
    try {
      const {
        enseigne,
        nom_raison_sociale,
        adresse,
        activite_principale,
      } = await getSiretInformation(siret);

      setEnseigne(enseigne ? enseigne : '');
      setNomRaisonSociale(nom_raison_sociale ? nom_raison_sociale : '');
      setAdresse(adresse ? adresse : '');
      setActivitePrincipale(activite_principale ? activite_principale : '');
    } catch (e) {
      setEnseigne('');
      setNomRaisonSociale('');
      setAdresse('');
      setActivitePrincipale('');
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

  const onOrganizationChange = event => {
    const new_organization_id = parseInt(event.target.value);

    handleOrganizationChange({
      organization_id: new_organization_id,
      siret: user.organizations.find(o => o.id === new_organization_id).siret,
    });
  };

  return (
    <>
      <div className="form__group">
        {!disabled &&
          user.organizations.length > 1 &&
          organization_id && (
            <>
              <label htmlFor="search-siret">
                Sélectionnez votre organisme avec son SIRET
              </label>
              <select
                value={organization_id}
                name="organization_id"
                id="search-siret"
                disabled={disabled}
                onChange={onOrganizationChange}
              >
                {!isLoading &&
                  user.organizations.map(({ id, siret }) => (
                    <option key={id} value={id}>
                      {siret}
                    </option>
                  ))}
              </select>
            </>
          )}

        {(disabled || user.organizations.length === 1) && (
          <>
            <label htmlFor="search-siret">SIRET</label>
            <input type="text" id="siret" disabled value={siret} />
          </>
        )}
        <small className="card__meta" style={{ display: 'block' }}>
          <i>
            Cette information peut être rendue publique.{' '}
            {!disabled && (
              <a href={`${OAUTH_HOST}/users/join-organization`}>
                Faire une demande pour une autre organisation.
              </a>
            )}
          </i>
        </small>
      </div>

      {activitePrincipale &&
        !isValidNAFCode(targetApi, activitePrincipale) && (
          <div className="form__group">
            <div className="notification warning">
              Votre organisme ne semble pas être éligible
            </div>
          </div>
        )}

      <div className="form__group">
        <label htmlFor="nom_raison_sociale">Raison sociale</label>
        <input
          type="text"
          id="nom_raison_sociale"
          disabled
          value={nomRaisonSociale}
        />
        <small className="card__meta">
          <i>Cette information peut être rendue publique.</i>
        </small>
      </div>

      <div className="form__group">
        <label htmlFor="enseigne">Enseigne</label>
        <input type="text" id="enseigne" disabled value={enseigne} />
      </div>

      <div className="form__group">
        <label htmlFor="adresse">Adresse</label>
        <input type="text" id="adresse" disabled value={adresse} />
      </div>
      <div className="form__group">
        <label htmlFor="activite_principale">Code NAF</label>
        <input
          type="text"
          id="activite_principale"
          disabled
          value={activitePrincipale}
        />
      </div>
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
