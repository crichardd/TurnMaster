import './css/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState} from 'react';
import Header from './components/HeaderComponents';
import './css/menu.css';
import SideBar from './components/SideBar';
import { useLocation } from 'react-router-dom';
import LibrabyComponents from './components/LibrabyComponents';


function LandingPage() {

  const location = useLocation();

  return (
    <div className="landing-page">
      <Header/>
      <SideBar/>
      <div className="library-container">
        <LibrabyComponents/>
      </div>
    </div>
  );
}

export default LandingPage;