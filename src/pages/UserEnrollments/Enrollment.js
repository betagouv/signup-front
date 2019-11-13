import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';

import './Enrollment.css';

import { hashToQueryParams } from '../../lib/utils';

import { TARGET_API_LABELS } from '../EnrollmentList';

import History from './History';

const { REACT_APP_BACK_HOST: BACK_HOST } = process.env;

export const STATUS_LABELS = {
  pending: 'Brouillon',
  modification_pending: 'Modifications demandés',
  sent: 'En cours de validation',
  validated: 'Validée',
  refused: 'Refusée',
};

export const API_ICONS = {
  franceconnect: 'logo-fc.png',
  api_droits_cnam: 'logo-cnam.jpg',
  api_impot_particulier: 'logo-dgfip.png',
  api_impot_particulier_step2: 'logo-dgfip.png',
};

const Enrollment = ({
  id,
  user,
  events,
  target_api,
  intitule,
  description,
  status,
  updated_at,
  onSelect,
}) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        `${BACK_HOST}/api/stats${hashToQueryParams({ target_api })}`
      );
      setData(result.data);
    }

    fetchData();
  }, [target_api]);

  const handleClick = useCallback(
    e => {
      onSelect(e, id, target_api);
    },
    [id, target_api, onSelect]
  );

  return (
    <div className="enrollment">
      <div className="enrollment-header">
        <div className="fs">
          {TARGET_API_LABELS[target_api]}{' '}
          {API_ICONS[target_api] && (
            <div>
              <img
                src={`/images/${API_ICONS[target_api]}`}
                alt={`logo ${TARGET_API_LABELS[target_api]}`}
              />
            </div>
          )}
        </div>
        <div className={`tag ${status}-tag`}>{STATUS_LABELS[status]}</div>
      </div>

      <div className="enrollment-body">
        <div className="title">
          <div className="intitule">{intitule || 'Aucun intitulé'}</div>
          <div>
            Demande effectuée le <b>{moment(updated_at).format('L')}</b> par{' '}
            <b>{user.email}</b>
          </div>
        </div>
        {<p>{description || 'Aucune description'}</p>}

        {data && (
          <History
            averageProcessingTimeInDays={
              Math.round(data.average_processing_time_in_days * 100) / 100
            }
            status={status}
            events={events}
            updated_at={updated_at}
          />
        )}

        <div className="enrollment-footer">
          <div>
            <b>N° {id}</b>
          </div>
          {status !== 'refused' && (
            <button className="button large" onClick={handleClick}>
              Consulter
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Enrollment.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  target_api: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
  description: PropTypes.string,
  intitule: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

export default Enrollment;
