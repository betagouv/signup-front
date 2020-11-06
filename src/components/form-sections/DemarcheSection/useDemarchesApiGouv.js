import { useState, useEffect } from 'react';
import { getDemarches } from '../../../services/external';
import { objectToCollectionWithKey } from '../../../lib';

const useDemarches = targetApi => {
  const [demarches, setDemarches] = useState([]);

  useEffect(() => {
    async function fetchDemarches() {
      if (!targetApi) return [];

      const demarches = await getDemarches(targetApi);

      setDemarches(
        objectToCollectionWithKey(demarches).map(e => ({
          ...e,
          path: e.path.replace('https://datapass.api.gouv.fr/', '/'),
        }))
      );
    }

    fetchDemarches();
  }, [targetApi]);

  return demarches;
};

export default useDemarches;
