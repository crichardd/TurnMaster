import '../css/library.css';
import { useLocation } from "react-router-dom";

interface ProfilProps {
    username: string;
}

function ProfilComponent(props: ProfilProps){
const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username") || "Utilisateur";

    return (
        <div className="gameWrapper">

            <h2>Mon nom: {username}</h2>
        </div>
    );

}

export default ProfilComponent;