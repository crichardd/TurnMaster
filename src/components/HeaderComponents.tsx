import { useNavigate } from "react-router-dom";
import '../css/header.css'

function HeaderComponents() {
  const navigate = useNavigate();

  function handleLandingPage() {
    navigate("/LandingPage");
  }
  function handleProfilePage() {
    navigate("/Profil");
  }

  return (
    <header className="header">
      <nav>
        <a href="#" className='mint titleMain' onClick={handleLandingPage}><h1>TurnMaster</h1></a>
        <a href="#" onClick={handleProfilePage}><img className="profilImg" src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png" alt="Image de profil" /></a>
      </nav>
    </header>
  );
}

export default HeaderComponents;
