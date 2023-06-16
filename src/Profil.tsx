import './css/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/HeaderComponents';
import LibraryComponents from './components/LibraryComponents';
import './css/menu.css';
import SideBar from "./components/SideBar";

function LandingPage() {
  return (
    <div className="landing-page">
      <Header/>
      <SideBar/>
      <div className="library-container">
        
      </div>
    </div>
  );
}

export default LandingPage;