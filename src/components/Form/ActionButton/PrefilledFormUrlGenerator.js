import { useEffect } from 'react';
import { hashToQueryParams } from '../../../lib';

export const PrefilledFormUrlGenerator = ({ enrollment }) => {
  useEffect(() => {
    console.log("type 'window.generateUrl()' to get the prefilled form url");
  }, []);

  useEffect(() => {
    window.generateUrl = () => {
      const {
        intitule,
        description,
        data_recipients,
        data_retention_period,
        fondement_juridique_title,
        fondement_juridique_url,
        scopes,
      } = enrollment;
      const queryParams = hashToQueryParams({
        intitule,
        description,
        data_recipients,
        data_retention_period,
        fondement_juridique_title,
        fondement_juridique_url,
        scopes,
      });
      console.log(
        `${window.location.origin}/${enrollment.target_api.replace(
          /_/g,
          '-'
        )}${queryParams}`
      );
    };

    return () => delete window.generateUrl;
  }, [enrollment]);

  return null;
};
