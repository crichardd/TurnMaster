import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../css/header.css';

interface stateType {
  username: string;
}

interface HeaderProps {
  username: string;
}

function HeaderComponents(props: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  function handleLandingPage() {
    if (location.state && location.state.username) {
      navigate(`/landingpage?username=${location.state.username}`);
    } else {
      navigate("/landingpage");
    }
  }

  function handleProfilePage() {
    if (location.state && location.state.username) {
      navigate(`/profil?username=${location.state.username}`);
    } else {
      navigate("/profil");
    }
  }

  return (
    <header className="header">
      <nav>
        <a href="#" className="mint titleMain" onClick={handleLandingPage}>
          <h1>Bienvenue, {props.username ? props.username : "Utilisateur"}!</h1>
        </a>
        <a href="#" onClick={handleProfilePage}>
          <img
            className="profilImg"
            src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
            alt="Image de profil"
          />
        </a>
      </nav>
    </header>
  );
}

export default HeaderComponents;
