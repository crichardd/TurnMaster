

import { useLocation } from "react-router-dom";
import Header from "./components/HeaderComponents";
import SideBar from "./components/SideBar";
import './css/profil.css';
import ProfilComponent from "./components/ProfilComponent";



function Profil() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username") || "Utilisateur";

  return (
    <div className="Profil-page">
      <Header username={username} />
      <SideBar />
      <div className="profil-container">
       <ProfilComponent username={username}/>
      </div>
    </div>
  );
}

export default Profil;

