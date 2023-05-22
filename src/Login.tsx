
import './css/login.css';
import { useState, useRef, useEffect} from 'react';
import { LoginService } from './services/Login.service';
import { useNavigate } from "react-router-dom";
import { LoginDTO } from './dto/Login.dto';
import { InscriptionDTO } from './dto/Add.dto';
import { InscriptionService } from './services/Inscription.service';


export default function Login() {

    const [connect, setConnect] = useState<LoginDTO>();
    const [status, setStatus] = useState<boolean>(false);
    const navigate = useNavigate();

    async function handlelogin(username: any) {
      const result = await LoginService.getInstance().username(username);
      setConnect(result);
          
      setStatus(true);
      navigate("/LandingPage", { state: { username: username.username } });
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const username = formData.get("username");
        const password = formData.get("password");
      
        handlelogin({ username, password });
    };

    const [inscription, setInscription] = useState<InscriptionDTO>();
  
    async function handleInscription(inscription: any) {
      const result = await InscriptionService.getInstance().inscription(
        inscription
      );
      setInscription(result);
      navigate("/landingPage", { state: { username: inscription.username } });

    }

    const handleSubmitInscription = (event: any) => {
      event.preventDefault();

      const username = event.target.username.value;
      const password = event.target.elements.password.value;
  
      handleInscription({ username, password });
    };

  return (
    <div>
      <div>
        <title>Slide Navbar</title>
        <link rel="stylesheet" type="text/css" href="slide navbar style.css"/>
        <link href="https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap" rel="stylesheet"/>
      </div>  
      <div className='loginContainer'>
        <div className="main">  	
          <input type="checkbox" className='loginInput'  id="chk" aria-hidden="true"/>

          <div className="signup">
            <form onSubmit={handleSubmitInscription}>
              <label className='loginLabel' htmlFor="chk" aria-hidden="true"> Inscription</label>
              <input className='loginInput' type="text" name="username" placeholder="username"/>
              <input className='loginInput' type="password" name="password" placeholder="password" autoComplete="new-password"/>
              <input className='loginInput' type="password" name="password2" placeholder="password" autoComplete="new-password"/>
              <button className='loginButton' type="submit">Sign up</button>
            </form>
          </div>

          <div className="login">
            <form onSubmit={handleSubmit}>
              <label htmlFor="chk" aria-hidden="true" className='loginLabel'> Connexion </label>
              <input className='loginInput' type="text" name="username" placeholder="nom d'utilisateur"/>
              <input className='loginInput' type="password" name="password" placeholder="mot de passe" autoComplete="new-password"/>
              <button className='loginButton' type="submit">Connexion</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
