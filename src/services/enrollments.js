import jsonToFormData from '../lib/json-form-data';
import httpClient from '../lib/http-client';
import {
  collectionWithKeyToObject,
  hashToQueryParams,
  objectToCollectionWithKey,
} from '../lib';

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

export function getNextEnrollments(id) {
  return httpClient
    .get(`${BACK_HOST}/api/enrollments/${id}/next_enrollments`, {
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
  // NB. if the user has more than 100 validated franceconnect enrollments, he won’t be able to choose amongst them all
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
        enrollments.map((e) => ({
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

export function computeNextEnrollmentState({
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

export function updateRgpdContact({
  enrollmentId,
  label,
  email,
  phoneNumber,
  role,
}) {
  const enrollment = {};
  if (label) enrollment[`${role}_label`] = label;
  if (email) enrollment[`${role}_email`] = email;
  if (phoneNumber) enrollment[`${role}_phone_number`] = phoneNumber;
  const serializedEnrollment = serializeEnrollment(enrollment);
  return httpClient
    .patch(
      `${BACK_HOST}/api/enrollments/${enrollmentId}/update_rgpd_contact`,
      serializedEnrollment,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .then(({ data }) => data);
}

export function updateOwner({ enrollmentId, email }) {
  const enrollment = {};
  enrollment[`user_email`] = email;
  const serializedEnrollment = serializeEnrollment(enrollment);
  return httpClient
    .patch(
      `${BACK_HOST}/api/enrollments/${enrollmentId}/update_owner`,
      serializedEnrollment,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .then(({ data }) => data);
}

export function deleteEnrollment({ id }) {
  return httpClient.delete(`${BACK_HOST}/api/enrollments/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
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

export function copyEnrollment({ id }) {
  return httpClient
    .post(`${BACK_HOST}/api/enrollments/${id}/copy`, {
      headers: { 'Content-type': 'application/json' },
    })
    .then(({ data }) => data);
}
