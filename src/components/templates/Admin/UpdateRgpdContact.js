import React, { useState } from 'react';
import { updateRgpdContact } from '../../../services/enrollments';
import { getErrorMessages } from '../../../lib';
import TextInput from '../../atoms/inputs/TextInput';
import RadioInput from '../../atoms/inputs/RadioInput';

export const UpdateRgpdContact = () => {
  const [enrollmentId, setEnrollmentId] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [job, setJob] = useState('');
  const [role, setRole] = useState('');
  const [success, setSuccess] = useState();
  const [error, setError] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      setSuccess(false);
      await updateRgpdContact({
        enrollmentId,
        nom: nom.trim(),
        prenom: prenom.trim(),
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        job: job.trim(),
        role,
      });
      setEnrollmentId('');
      setNom('');
      setPrenom('');
      setEmail('');
      setPhoneNumber('');
      setJob('');
      setRole('');
      setError(null);
      setSuccess(true);
    } catch (e) {
      setError(getErrorMessages(e));
    }
  };

  return (
    <div className="panel">
      <h2>Modification des contacts RGPD</h2>
      {success && (
        <div className="notification success">
          Contact mis à jour et mail envoyé avec succès !
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
          label="Nouveau nom"
          helper="vide = pas de modification"
          onChange={({ target: { value } }) => setNom(value)}
          value={nom}
        />
        <TextInput
          label="Nouveau prénom"
          helper="vide = pas de modification"
          onChange={({ target: { value } }) => setPrenom(value)}
          value={prenom}
        />
        <TextInput
          label="Nouveau poste occupé"
          helper="vide = pas de modification"
          onChange={({ target: { value } }) => setJob(value)}
          value={job}
        />
        <TextInput
          label="Nouvel email"
          helper="vide = pas de modification"
          onChange={({ target: { value } }) => setEmail(value)}
          value={email}
        />
        <TextInput
          label="Nouveau numéro de téléphone"
          helper="vide = pas de modification"
          onChange={({ target: { value } }) => setPhoneNumber(value)}
          value={phoneNumber}
        />
        <RadioInput
          label="Type de contact"
          options={[
            {
              id: 'responsable_traitement',
              label: 'Responsable de traitement',
            },
            { id: 'dpo', label: 'Délégué à la protection de données' },
          ]}
          onChange={({ target: { value } }) => setRole(value)}
          value={role}
          useOtherOption={false}
        />
        <button type="submit">
          Mettre à jour le contact et lui envoyer le mail RGPD
        </button>
      </form>
    </div>
  );
};

export default UpdateRgpdContact;
