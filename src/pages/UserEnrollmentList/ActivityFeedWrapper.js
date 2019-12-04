import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ActivityFeed from '../../components/form/ActivityFeed';
import { getCachedAPIAverageProcessingTimeInDays } from '../../lib/services';

const ActivityFeedWrapper = ({ events, status, target_api }) => {
  const [
    averageProcessingTimeInDays,
    setAverageProcessingTimeInDays,
  ] = useState(0);

  useEffect(() => {
    async function fetchStats() {
      const {
        data: { average_processing_time_in_days },
      } = await getCachedAPIAverageProcessingTimeInDays(target_api);
      setAverageProcessingTimeInDays(average_processing_time_in_days);
    }

    if (status === 'sent') {
      fetchStats();
    }
  }, [status, target_api]);

  if (status === 'pending') {
    return (
      <div className="notification">
        <p>
          Votre demande est actuellement en cours d’édition. Notre service
          juridique pourra la consulter lorsque vous cliquerez sur "Soumettre la
          demande".
        </p>
      </div>
    );
  }

  if (status === 'sent' && averageProcessingTimeInDays > 0) {
    return (
      <div className="notification">
        Le temps de traitement moyen constaté est de{' '}
        <b>{averageProcessingTimeInDays} jours</b>.
      </div>
    );
  }

  if (status === 'modification_pending') {
    return (
      <div className="notification warning">
        Votre demande est incomplète et requiert les modifications suivantes :
        <div style={{ margin: '1em 0' }}>
          {events.length > 0 && <ActivityFeed events={events} />}
        </div>
      </div>
    );
  }

  return null;
};

ActivityFeedWrapper.propTypes = {
  events: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  target_api: PropTypes.string.isRequired,
};

export default ActivityFeedWrapper;
