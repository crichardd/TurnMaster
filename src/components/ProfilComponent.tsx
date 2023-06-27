import '../css/profil.css';
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

interface ProfilProps {
    username: string;
    closePopup: () => void;
}

function ProfilComponent(props: ProfilProps){
const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username") || "Utilisateur";
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

    return (
        <div className="container mt-4 mb-4 p-3 d-flex justify-content-center"> 
            <div className="card p-4 cardProfil"> 
                <div className=" image d-flex flex-column justify-content-center align-items-center"> 
                    <button className="btn btn-secondary"> 
                        <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" />
                    </button> 
                    <span className="name mt-3">Eleanor Pena</span> 
                    <div className="d-flex flex-row justify-content-center align-items-center mt-3"> 
                        <span className="number">1069 
                            <span className="point">Point</span>
                        </span> 
                    </div> 
                    <div className=" d-flex mt-2"> 
                        <button className="btn1 btn-dark">Edit Profile</button> 
                    </div> 
                    <button onClick={closePopup} className="cancel button">Annuler</button>
                </div> 
            </div>
        </div>
    );
}

export default ProfilComponent;