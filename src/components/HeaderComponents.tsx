import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../css/header.css';

interface HeaderProps {
  username: string;
  openPopup: () => void;
}

function HeaderComponents(props: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const username = location.state ? location.state.username : ""; // Récupérer le nom d'utilisateur de la location

  function handleLandingPage() {
    if (location.state && location.state.username) {
      navigate(`/landingpage?username=${location.state.username}`);
    } else {
      navigate("/landingpage");
    }
  }

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  return (
    <header className="header">
      <nav>
        <a href="#" className="mint titleMain" onClick={handleLandingPage}>
          <h1>Bienvenue, {props.username ? props.username : "Utilisateur"}!</h1>
        </a>
        <button onClick={props.openPopup}>
          <img
            
            className="profilImg"
            src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
            alt="Image de profil"
          />
        </button>
      </nav>
    </header>
  );
}

export default HeaderComponents;
