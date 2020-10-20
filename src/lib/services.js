import { mapValues, memoize } from 'lodash';
import jsonToFormData from './json-form-data';
import httpClient from './http-client';

import {
  collectionWithKeyToObject,
  hashToQueryParams,
  objectToCollectionWithKey,
} from './index';
const { REACT_APP_BACK_HOST: BACK_HOST } = process.env;

export function serializeEnrollment(enrollment) {
  return jsonToFormData({ enrollment });
}

export function createOrUpdateEnrollment({ enrollment }) {
  const formatedEnrollment = {
    ...enrollment,
    contacts: objectToCollectionWithKey(enrollment.contacts),
  };
  const serializedEnrollment = serializeEnrollment(formatedEnrollment);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  if (enrollment.id) {
    return (
      httpClient
        .patch(
          `${BACK_HOST}/api/enrollments/${enrollment.id}`,
          serializedEnrollment,
          config
        )
        // format contact to a more usable structure
        // the backend should be able to use this structure to in the future
        .then(({ data: enrollment }) => ({
          ...enrollment,
          contacts: collectionWithKeyToObject(enrollment.contacts),
        }))
    );
  }

  return (
    httpClient
      .post(`${BACK_HOST}/api/enrollments/`, serializedEnrollment, config)
      // format contact to a more usable structure
      // the backend should be able to use this structure to in the future
      .then(({ data: enrollment }) => ({
        ...enrollment,
        contacts: collectionWithKeyToObject(enrollment.contacts),
      }))
  );
}

export function getUserEnrollment(id) {
  return (
    httpClient
      .get(`${BACK_HOST}/api/enrollments/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      // format contact to a more usable structure
      // the backend should be able to use this structure to in the future
      .then(({ data: enrollment }) => ({
        ...enrollment,
        contacts: collectionWithKeyToObject(enrollment.contacts),
      }))
  );
}

export function hasAccessToEnrollment(id) {
  return getUserEnrollment(id)
    .then(() => true)
    .catch(() => false);
}

export function getEnrollmentCopies(id) {
  return httpClient
    .get(`${BACK_HOST}/api/enrollments/${id}/copies`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(({ data: { enrollments: data } }) => data);
}

export function getPublicValidatedEnrollments(targetApi) {
  const queryParam = hashToQueryParams({ target_api: targetApi });

  return httpClient
    .get(`${BACK_HOST}/api/enrollments/public${queryParam}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(({ data }) => data);
}

export function getEnrollments({
  page = null,
  archived = null,
  sortBy = [],
  filter = [],
  detailed = null,
  size = null,
}) {
  const formatedSortBy = sortBy.map(({ id, desc }) => ({
    [id]: desc ? 'desc' : 'asc',
  }));
  const formatedFilter = filter.map(({ id, value }) => ({
    [id]: value,
  }));
  const queryParam = hashToQueryParams({
    page,
    archived,
    detailed,
    size,
    sortedBy: formatedSortBy,
    filter: formatedFilter,
  });

  return httpClient
    .get(`${BACK_HOST}/api/enrollments/${queryParam}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(({ data }) => data);
}

export function getUserValidatedEnrollments(targetApi) {
  // NB. if the user has more than 100 validated franceconnect enrollments, he won't be able to choose amongst them all
  // since we arbitrary limit the max size of the result to 100.
  return (
    getEnrollments({
      filter: [
        { id: 'status', value: 'validated' },
        { id: 'target_api', value: targetApi },
      ],
      detailed: true,
      size: 100,
    })
      // format contact to a more usable structure
      // the backend should be able to use this structure too in the future
      .then(({ enrollments }) =>
        enrollments.map(e => ({
          ...e,
          contacts: collectionWithKeyToObject(e.contacts),
        }))
      )
  );
}

export function getUserEnrollments() {
  return httpClient
    .get(`${BACK_HOST}/api/enrollments/user`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(({ data }) => data);
}

export function triggerEnrollment({
  action,
  id,
  comment,
  commentFullEditMode,
}) {
  const options = {
    event: action,
  };

  if (comment) {
    options.comment = comment;
  }

  if (commentFullEditMode) {
    options.commentFullEditMode = commentFullEditMode;
  }

  return httpClient.patch(
    `${BACK_HOST}/api/enrollments/${id}/trigger`,
    options,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

export function deleteEnrollment({ id }) {
  return httpClient.delete(`${BACK_HOST}/api/enrollments/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function getOrganizationInformation(siret) {
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
          },
          v => (v ? v : 'Non renseigné')
        );
      }
    );
}

export function getMostUsedComments({ eventName, targetApi } = {}) {
  const queryParam = hashToQueryParams({
    event: eventName,
    target_api: targetApi,
  });

  return httpClient
    .get(`${BACK_HOST}/api/events/most-used-comments${queryParam}`, {
      headers: { 'Content-type': 'application/json' },
    })
    .then(({ data }) => data.map(({ comment }) => comment));
}

export async function getAPIStats(target_api) {
  return httpClient.get(
    `${BACK_HOST}/api/stats${hashToQueryParams({ target_api })}`,
    {
      headers: { 'Content-type': 'application/json' },
    }
  );
}

export async function getMajorityPercentileProcessingTimeInDays(target_api) {
  return httpClient.get(
    `${BACK_HOST}/api/stats/majority_percentile_processing_time_in_days${hashToQueryParams(
      {
        target_api,
      }
    )}`,
    {
      headers: { 'Content-type': 'application/json' },
    }
  );
}

export const getCachedMajorityPercentileProcessingTimeInDays = memoize(
  getMajorityPercentileProcessingTimeInDays
);

export function copyEnrollment({ id }) {
  return httpClient
    .post(`${BACK_HOST}/api/enrollments/${id}/copy`, {
      headers: { 'Content-type': 'application/json' },
    })
    .then(({ data }) => data);
}

export function getUsers({ usersWithRolesOnly = true }) {
  const queryParam = hashToQueryParams({
    users_with_roles_only: usersWithRolesOnly,
  });
  return httpClient
    .get(`${BACK_HOST}/api/users${queryParam}`)
    .then(({ data }) => data);
}

export function updateUser({ id, roles = [] }) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return httpClient
    .patch(`${BACK_HOST}/api/users/${id}`, { user: { roles } }, config)
    .then(({ data }) => data);
}
