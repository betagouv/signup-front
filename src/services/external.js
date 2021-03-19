import httpClient from '../lib/http-client';
import { mapValues, memoize } from 'lodash';

const { REACT_APP_BACK_HOST: BACK_HOST } = process.env;

function getOrganizationActivityDetails(NafCode) {
  return httpClient
    .get(`${BACK_HOST}/api/insee/naf/${NafCode}`, {
      headers: { 'Content-type': 'application/json' },
    })
    .then(({ data }) => data);
}

export const getCachedOrganizationActivityDetails = memoize(
  getOrganizationActivityDetails
);

function getOrganizationInformation(siret) {
  return httpClient
    .get(
      `https://entreprise.data.gouv.fr/api/sirene/v3/etablissements/${siret}`
    )
    .then(
      ({
        data: {
          etablissement: {
            numero_voie,
            indice_repetition,
            type_voie,
            libelle_voie,
            geo_adresse,
            code_postal,
            libelle_commune,
            activite_principale,
            denomination_usuelle,
            etat_administratif,
            unite_legale: {
              denomination,
              nom,
              prenom_1,
              prenom_2,
              prenom_3,
              prenom_4,
            },
          },
        },
      }) => {
        const adresse = [
          numero_voie,
          indice_repetition,
          type_voie,
          libelle_voie,
        ]
          .filter(e => e)
          .join(' ');

        const prenom_nom = [prenom_1, prenom_2, prenom_3, prenom_4, nom]
          .filter(e => e)
          .join(' ');

        return mapValues(
          {
            title: denomination || denomination_usuelle || prenom_nom,
            activite: `${activite_principale}`,
            adresse,
            ville: `${code_postal} ${libelle_commune}`,
            etat_administratif,
            geo_adresse,
            code_postal,
          },
          v => (v ? v : 'Non renseigné')
        );
      }
    );
}

export const getCachedOrganizationInformation = memoize(
  getOrganizationInformation
);
