import './css/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/HeaderComponents';
import LibraryComponents from './components/LibraryComponents';
import './css/menu.css';
import SideBar from "./components/SideBar";

import { useLocation } from 'react-router-dom';


function LandingPage() {
  const location = useLocation();
  const username = location.state ? location.state.username : ""; // Récupérer le nom d'utilisateur de la location

  return (
    <div className="landing-page">
      <Header username={username} /> {/* Passer le nom d'utilisateur comme propriété */}
      <SideBar />
      <div className="library-container">
        <LibraryComponents />
      </div>
    </div>
  );
}

export default LandingPage;