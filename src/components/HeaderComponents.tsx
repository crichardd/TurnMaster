import {useNavigate } from "react-router-dom";
import '../css/header.css'
  
function HeaderComponents(){

    const navigate = useNavigate();

    function handleLandingPage() {
        navigate("/LandingPage");
    }
    return (
        <header className="header">
                <nav>
                    <a href="#" className='mint titleMain' onClick={handleLandingPage}><h1>TurnMaster</h1></a>
                </nav>
            
        </header> 
    );

}

export default HeaderComponents;
