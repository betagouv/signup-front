import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../components/icons/spinner';
import { copyEnrollment } from '../services/enrollments';
import { Redirect } from 'react-router-dom';
import { getErrorMessages } from '../lib';

const CopyEnrollment = ({
  match: {
    params: { enrollmentId },
  },
}) => {
  const [copyError, setCopyError] = useState(false);
  const [alreadyCopiedError, setAlreadyCopiedError] = useState(false);
  const [copiedEnrollmentId, setCopiedEnrollmentId] = useState(null);
  const [copiedTargetApi, setCopiedTargetApi] = useState(null);

  const triggerEnrollmentCopy = async ({ enrollmentId }) => {
    try {
      setCopyError(false);
      setAlreadyCopiedError(false);
      const { id, target_api } = await copyEnrollment({
        id: enrollmentId,
      });

      setCopiedEnrollmentId(id);
      setCopiedTargetApi(target_api);
    } catch (e) {
      if (
        getErrorMessages(e)[0].includes(
          "Copied from enrollment n'est pas disponible"
        )
      ) {
        setAlreadyCopiedError(true);
      } else {
        setCopyError(true);
      }
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
      <section className="section-grey section-full-page">
        <div className="notification error">
          Erreur inconnue lors de la copie de la demande d'habilitation.
        </div>
      </section>
    );
  }

  if (alreadyCopiedError) {
    return (
      <section className="section-grey section-full-page">
        <div className="notification error">
          Copie impossible : une copie de cette demande d'habilitation existe
          déjà.
        </div>
      </section>
    );
  }

  return (
    <section className="section-grey section-full-page">
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
