import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState} from 'react';
import Header from './components/HeaderComponents';
import './css/Menu.css';
import SideBar from './components/SideBar';
import { useLocation } from 'react-router-dom';
import LibraryComponents from './components/LibraryComponents';


function LandingPage() {

  const location = useLocation();


  return (
    <div className="landing-page">
      <Header/>
      <SideBarTest/>
      <div className="library-container">
        <LibraryComponents/>
      </div>
    </div>
  );
}

export default LandingPage;