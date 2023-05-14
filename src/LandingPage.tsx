import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState} from 'react';
import Header from './components/HeaderComponents';
import './css/Menu.css';
import SideBar from './components/SideBar';
import { useLocation } from 'react-router-dom';
import SideBarTest from "./components/SideBarTest";

function LandingPage() {

  const location = useLocation();


  return (
    <div className="App">
      <Header/>
      <SideBarTest/>
    </div>
  );
}

export default LandingPage;