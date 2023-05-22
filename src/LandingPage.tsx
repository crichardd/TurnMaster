import './css/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/HeaderComponents';
import './css/menu.css';
import SideBar from "./components/SideBar";

function LandingPage() {
  return (
    <div className="App">
      <Header/>
      <SideBar/>
    </div>
  );
}

export default LandingPage;