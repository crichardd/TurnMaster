import { useLocation, useNavigate } from "react-router-dom";
import '../css/header.css'

interface stateType {
    username: string;
}
  
function HeaderComponents(){

    const navigate = useNavigate();
    const location = useLocation();
    
    function handleProfil() {
        navigate("/User");
    }
    function handleLandingPage() {
        navigate("/LandingPage");
    }
    function handleMenuConnected() {
        navigate("/Menu/user", { state: { connect: true } });
    }

    if (!location.state || !location.state.username) return null;
    
    return (
        <header className="header">
                <nav>
                    <a href="#" className='mint titleMain' onClick={handleLandingPage}><h1>TurnMaster</h1></a>
                </nav>
            
        </header> 
    );

}

export default HeaderComponents;
