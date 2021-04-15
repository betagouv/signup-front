import React, { useState } from 'react';
import TextInput from '../../atoms/inputs/TextInput';
import { updateOwner } from '../../../services/enrollments';
import { getErrorMessages } from '../../../lib';

export const UpdateOwner = () => {
  const [enrollmentId, setEnrollmentId] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState();
  const [error, setError] = useState(null);

  const onSubmit = async event => {
    event.preventDefault();
    try {
      setSuccess(false);
      await updateOwner({ enrollmentId, email: email.trim() });
      setEnrollmentId('');
      setEmail('');
      setError(null);
      setSuccess(true);
    } catch (e) {
      setError(getErrorMessages(e));
    }
  };

  return (
    <div className="panel">
      <h2>Modification du propriétaire de la demande</h2>
      {success && (
        <div className="notification success">
          Le propriétaire de la demande à correctement été mis à jour.
        </div>
      )}
      {error && <div className="notification error">{error}</div>}
      <form onSubmit={onSubmit}>
        <TextInput
          label="Identifiant de la demande"
          onChange={({ target: { value } }) => setEnrollmentId(value)}
          value={enrollmentId}
          required
        />
        <TextInput
          label="Nouvel email"
          onChange={({ target: { value } }) => setEmail(value)}
          value={email}
          required
        />
        <button type="submit">
          Mettre à jour le propriétaire de la demande
        </button>
      </form>
    </div>
  );
};

export default UpdateOwner;
