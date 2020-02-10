import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../components/icons/spinner';
import { copyEnrollment } from '../lib/services';
import { Redirect } from 'react-router-dom';

const CopyEnrollment = ({
  match: {
    params: { enrollmentId },
  },
}) => {
  const [copyError, setCopyError] = useState(false);
  const [copiedEnrollmentId, setCopiedEnrollmentId] = useState(null);
  const [copiedTargetApi, setCopiedTargetApi] = useState(null);

  const triggerEnrollmentCopy = async ({ enrollmentId }) => {
    try {
      setCopyError(false);
      const { id, target_api } = await copyEnrollment({
        id: enrollmentId,
      });

      setCopiedEnrollmentId(id);
      setCopiedTargetApi(target_api);
    } catch (e) {
      setCopyError(true);
    }
  };

  useEffect(() => {
    if (enrollmentId) {
      triggerEnrollmentCopy({ enrollmentId });
    }
  }, [enrollmentId]);

  if (copiedEnrollmentId && copiedTargetApi) {
    return (
      <Redirect
        to={{
          pathname: `/${copiedTargetApi.replace(
            /_/g,
            '-'
          )}/${copiedEnrollmentId}`,
          state: { source: 'copy-authorization-request' },
        }}
      />
    );
  }

  if (copyError) {
    return (
      <section className="section-grey loader">
        <div className="notification error">
          Erreur inconnue lors de la copie de la demande d'habilitation.
        </div>
      </section>
    );
  }

  return (
    <section className="section-grey loader">
      <Spinner />
    </section>
  );
};

CopyEnrollment.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

CopyEnrollment.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default CopyEnrollment;
