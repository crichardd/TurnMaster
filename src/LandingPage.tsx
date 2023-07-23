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
  const username = location.state ? location.state.username : "";
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handlePasswordChange = (newPassword: string) => {
    console.log("New password:", newPassword);
  };

  return (
    <div className="landing-page">
      <Header username={username} openPopup={openPopup}/> 
      <div className='row '>
        <div className='col-3'>
        <SideBar />
        </div>
        <div className='col-6'>
          <div className="library-container" id="bodyLib">
            <LibraryComponents />
          </div>
          {isPopupOpen && (
            <div className="profil-container">
              <ProfilComponent
                username={username}
                closePopup={closePopup}
                onPasswordChange={handlePasswordChange} // Pass the callback to handle password change
              /> 
            </div>
          )}
        </div>
        <div className='col-3'>
          <div className="message-container">
            <MessageComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;