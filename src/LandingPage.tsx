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
import { useEffect } from 'react';

function LandingPage() {
  const location = useLocation();
  const { token } = location.state || {};
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
      console.log("Token in LandingPage:", token);
  }, [token]);

  const openPopup = () => {
      setIsPopupOpen(true);
  };

  const closePopup = () => {
      setIsPopupOpen(false);
  };

  const handlePasswordChange = (newPassword: string) => {
  };

  return (
    <div className="landing-page">
      <Header username={token} openPopup={openPopup}/> 
      <div className='row '>
        <div className='col-3'>
        <SideBar token={token}/>
        </div>
        <div className='col-6'>
          <div className="library-container" id="bodyLib">
            <LibraryComponents token={token} />
          </div>
          {isPopupOpen && (
            <div className="profil-container">
              <ProfilComponent
                token={token}
                closePopup={closePopup}
                onPasswordChange={handlePasswordChange} 
              /> 
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;