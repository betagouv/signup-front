import React, { useState } from 'react';
import { updateRgpdContact } from '../../../services/enrollments';
import { getErrorMessages } from '../../../lib';

export const RgpdUpdate = () => {
  const [enrollmentId, setEnrollmentId] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState();

  const onSubmit = async event => {
    event.preventDefault();
    try {
      setSuccess(false);
      await updateRgpdContact({ enrollmentId, email, role });
      setEnrollmentId('');
      setEmail('');
      setRole('');
      setError(null);
      setSuccess(true);
    } catch (e) {
      setError(getErrorMessages(e));
    }
  };

  return (
    <section className="section-grey full-width-section user-page">
      <div className="container">
        <h2>Modification des contacts RGPD</h2>
        {success && (
          <div className="notification success">
            Contact mis à jour et mail envoyé avec succès !
          </div>
        )}
        {error && <div className="notification error">{error}</div>}
        <div className="panel">
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="enrollment_id">Identifiant de la demande</label>
              <input
                type="text"
                onChange={({ target: { value } }) => setEnrollmentId(value)}
                id="enrollment_id"
                value={enrollmentId}
                required
              />
            </div>
            <div>
              <label htmlFor="rgpd_contact_email">Nouvel email</label>
              <input
                type="text"
                onChange={({ target: { value } }) => setEmail(value)}
                id="rgpd_contact_email"
                value={email}
                required
              />
            </div>
            <div>
              <fieldset>
                <legend>Type de contact</legend>
                <>
                  <input
                    type="radio"
                    id="role_responsable_traitement"
                    value="responsable_traitement"
                    checked={role === 'responsable_traitement'}
                    onChange={() => setRole('responsable_traitement')}
                  />
                  <label
                    htmlFor="role_responsable_traitement"
                    className="label-inline"
                  >
                    Responsable de traitement
                  </label>
                </>
                <>
                  <input
                    type="radio"
                    id="role_dpo"
                    value="dpo"
                    checked={role === 'dpo'}
                    onChange={() => setRole('dpo')}
                  />
                  <label htmlFor="role_dpo" className="label-inline">
                    Délégué à la protection de données
                  </label>
                </>
              </fieldset>
            </div>
            <button type="submit">
              Mettre à jour le contact et lui envoyer le mail RGPD
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RgpdUpdate;
