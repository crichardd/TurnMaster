import { useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header({ connect }: { connect: boolean }){

    const navigate = useNavigate();
    const location = useLocation();

    function handleFriends() {
        navigate("/Friends");
    }
    function handleMessages() {
        navigate("/Message");
    }
    function handleProfil() {
        navigate("/User");
    }
    function handleLandingPage() {
        navigate("/LandingPage");
    }
    function handleMenuConnected() {
        navigate("/Menu/user", { state: { connect: true } });
    }
    return (
        <header className="header">

                <div className='mint titleMain'><h1> TurnMaster </h1> </div>

            
            
        </header> 
    );

}

export default Header;

/*

{location.pathname.indexOf("user") !== -1 || connect === true ? (
                <Navbar bg="light" expand="lg" style={{ height: "80px", minHeight: "80px",  width: "100%" }}>
                    <Container>
                        <Navbar.Brand href="" onClick={handleLandingPage}>
                            <div className='mint titleMain'><h1> TurnMaster </h1> </div>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="" onClick={handleFriends}>
                                    Amis
                                </Nav.Link>
                                <Nav.Link href="" onClick={handleMessages}>
                                    Conversation
                                </Nav.Link>
                                <Nav.Link href="" onClick={handleProfil}>
                                    Profil
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            ):(
                <div> </div>
            )}*/