import './css/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState} from 'react';
import Header from './components/HeaderComponents';
import './css/menu.css';
import SideBar from './components/SideBar';
import { useLocation } from 'react-router-dom';


function LandingPage() {

  const location = useLocation();

  return (
    <div className="App">
      <Header/>
      <SideBar/>
    </div>
  );
}

export default LandingPage;