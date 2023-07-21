import '../css/profil.css';
import React, { useState } from 'react';

interface ProfilProps {
  username: string;
  closePopup: () => void;
}

function ProfilComponent(props: ProfilProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(props.username);

  const toggleEdit = () => {
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setUsername(props.username);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
      <div className="card p-4 cardProfil">
        <div className="image d-flex flex-column justify-content-center align-items-center">
          <button className="btn btn-secondary">
            <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" />
          </button>
          {isEditing ? (
            <input
              type="text"
              value={username}
              onChange={handleInputChange}
              className="nameInput mt-3"
            />
          ) : (
            <span className="nameLabel mt-3">{props.username ? props.username : "Utilisateur"}</span>
          )}
          <span className="passWord mt-3"> mot de passe </span>
          <div className="d-flex flex-row justify-content-center align-items-center mt-3">
            <span className="number">1069 Point </span>
          </div>
          <div className=" d-flex mt-2">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="btn1 btn-dark">
                  Enregistrer
                </button>
                <button onClick={cancelEdit} className="btn1 btn-dark ml-2">
                  Annuler
                </button>
              </>
            ) : (
              <button onClick={toggleEdit} className="btn1 btn-dark">
                Modifier
              </button>
            )}
          </div>
          <button onClick={props.closePopup} className="cancel button">
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilComponent;
