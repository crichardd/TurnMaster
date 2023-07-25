import '../css/profil.css';
import React, { useEffect, useState } from 'react';
import { UserService } from '../services/User.Service';
import { useLocation } from 'react-router-dom';

interface ProfilProps {
  username: string;
  closePopup: () => void;
  onPasswordChange: (newPassword: string) => void; 
}

function ProfilComponent(props: ProfilProps) {
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const currentUsername = location.state?.username;
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState<String | null>(null);
  const [errorMessage, setErrorMessage] = useState<String | null>(null);


  const toggleEdit = () => {
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentPassword("");
    setNewPassword("");
  };

  const handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleSave = async () => {
    try {
      await UserService.updatePassword(currentUsername, currentPassword, newPassword);
      props.onPasswordChange(newPassword);
      setMessage("Le changement de mot de passe a été effectué avec succès.");
      setIsEditing(false);
    } catch (error: any) {
      if (error.message === 'Request failed with status code 500') {
        setErrorMessage("Les identifiants sont incorrects.");
      } else {
        setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
      }
    }
  };


  return (
    <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
      <div className="card p-4 cardProfil">
        <div className="image d-flex flex-column justify-content-center align-items-center">
          <button className="btn btn-secondary">
            <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" />
          </button>
          {errorMessage && <div className="error-message" style={{color: "red"}} >{errorMessage}</div>}
          {message && <div className="success-message" style={{color: "green"}}>{message}</div>}
          <span className="nameLabel mt-3">{props.username ? props.username : "Utilisateur"}</span>
          <span className="passWord mt-3">Mot de passe</span>
          {isEditing ? (
            <div className="passwordInputs">
              <input
                type="password"
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
                placeholder="Mot de passe actuel"
                className="passwordInput mt-3"
              />
              <input
                type="password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                placeholder="Nouveau mot de passe"
                className="passwordInput mt-3"
              />
            </div>
          ) : (
            <span className="passwordLabel mt-3">*********</span> // Display asterisks for password in non-edit mode
          )}
          <div className="d-flex flex-row justify-content-center align-items-center mt-3">
            <span className="number">1069 Point</span>
          </div>
          <div className="d-flex mt-2">
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
                Modifier mot de passe
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
