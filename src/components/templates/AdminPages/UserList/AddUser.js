import React, { useState } from 'react';
import { createUser } from '../../../../services/users';

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
        await createUser({ email: newUserEmail });
        setSuccess(true);
        setNewUserEmail('');
      }
    } catch (e) {
      setError(true);
    }
  };

  return (
    <>
      {success && (
        <div className="notification success">
          L'utilisateur a correctement été ajouté.
        </div>
      )}
      {error && (
        <div className="notification error">
          Erreur lors de la création de l'utilisateur.
        </div>
      )}
      <div className="form__group">
        <input type="text" onChange={handleChange} value={newUserEmail} />
        <button className="button" onClick={handleAddUser}>
          Ajouter l'utilisateur
        </button>
      </div>
    </>
  );
};

export default AddUser;
