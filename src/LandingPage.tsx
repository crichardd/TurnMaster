import './css/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/HeaderComponents';
import LibraryComponents from './components/LibraryComponents';
import './css/menu.css';
import SideBar from "./components/SideBar";
import { useState} from "react";
import { useLocation } from 'react-router-dom';
import ProfilComponent from "./components/ProfilComponent";
import './css/profil.css';
import MessageComponent from './components/MessageComponents';

function LandingPage() {
  const location = useLocation();
  const username = location.state ? location.state.username : ""; // Récupérer le nom d'utilisateur de la location
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };


  return (
    <div className="landing-page">
      <Header username={username} openPopup={openPopup}/> {/* Passer le nom d'utilisateur comme propriété */}
      <SideBar />
      <div className="library-container" id="bodyLib">
        <LibraryComponents />
      </div>
      {isPopupOpen && (
        <div className="profil-container">
          <ProfilComponent username={username} closePopup={closePopup} /> {/* Passer le nom d'utilisateur et la fonction closePopup comme propriétés */}
        </div>
      )}
      <div className="message-container">
        <MessageComponent />
      </div>
    </div>
  );
}

export default LandingPage;