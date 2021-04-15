import React, { useState } from 'react';
import { createUser } from '../../../services/users';
import TextInput from '../../atoms/inputs/TextInput';
import AutorenewIcon from '../../atoms/icons/autorenew';

export const AddUser = () => {
  const [newUserEmail, setNewUserEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = event => {
    setNewUserEmail(event.target.value);
  };

  const handleAddUser = async () => {
    setSuccess(false);
    setError(false);
    try {
      if (newUserEmail) {
        await createUser({ email: newUserEmail.trim() });
        setSuccess(true);
        setNewUserEmail('');
      }
    } catch (e) {
      setError(true);
    }
  };

  return (
    <div className="panel">
      <h2>Ajouter un utilisateur</h2>
      {success && (
        <div className="notification success">
          L'utilisateur a correctement été ajouté. Vous pouvez rafraichir la
          liste des utilisateurs en cliquant sur l'icone{' '}
          <AutorenewIcon size={16} />.
        </div>
      )}
      {error && (
        <div className="notification error">
          Erreur lors de la création de l'utilisateur.
        </div>
      )}
      <TextInput
        label="Adresse email du nouvel utilisateur à ajouter"
        onChange={handleChange}
        value={newUserEmail}
      />
      <button className="button" onClick={handleAddUser}>
        Ajouter l'utilisateur
      </button>
    </div>
  );
};

export default AddUser;
