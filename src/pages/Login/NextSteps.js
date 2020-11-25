import React, { useEffect, useState } from 'react';

import AuthIcon from '../../components/icons/auth';
import DemandeIcon from '../../components/icons/demande';
import HabilitationIcon from '../../components/icons/habilitation';
import TokenIcon from '../../components/icons/token';
import { getCachedMajorityPercentileProcessingTimeInDays } from '../../services/stats';

const NextSteps = ({ targetApi }) => {
  const [stat, setStat] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const {
        data: { majority_percentile_processing_time_in_days },
      } = await getCachedMajorityPercentileProcessingTimeInDays(targetApi);
      setStat(majority_percentile_processing_time_in_days);
    }

    fetchData();
  }, [targetApi]);

  return (
    <>
      <div className="next-steps">
        <div>
          <div>
            <AuthIcon />
          </div>
          <div>S’authentifier</div>
        </div>
        <div>
          <div>
            <DemandeIcon />
          </div>
          <div>Remplir sa demande</div>
        </div>
        <div>
          <div>
            <HabilitationIcon />
          </div>
          <div>Être habilité</div>
        </div>
        <div>
          <div>
            <TokenIcon />
          </div>
          <div>Recevoir son token</div>
        </div>
      </div>
      <div className="timeline">
        <div>
          <div className="step" />
        </div>
        <div>
          <div className="step" />
          {stat && <div className="time-indication">~ {stat} jour(s)</div>}
        </div>
        <div>
          <div className="step" />
        </div>
        <div>
          <div className="step" />
        </div>
      </div>
    </>
  );
};

export default NextSteps;
