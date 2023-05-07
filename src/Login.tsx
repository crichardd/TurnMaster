import './css/App.css';
import './css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useRef, useEffect} from 'react';
import { LoginService } from './services/Login.service';
import { useNavigate } from "react-router-dom";
import { LoginDTO } from './dto/Login.dto';
import { InscriptionDTO } from './dto/Add.dto';
import { InscriptionService } from './services/Inscription.service';

export const showSignin = () => {
  const prism = document.querySelector(".rec-prism") as HTMLElement;
  if (prism) {
      prism.style.transform = "translateZ(-100px)";
  }
}
  
export const showSignup = () => {
  const prism = document.querySelector(".rec-prism") as HTMLElement;
  if (prism) {
    prism.style.transform = "translateZ(-100px) rotateY( -90deg)";
  }
}

export const showForgotPassword = () => {
  const prism = document.querySelector(".rec-prism") as HTMLElement;
  if (prism) {
    prism.style.transform = "translateZ(-100px) rotateY( -180deg)";
  }
}

export const showSubscribe = () => {
  const prism = document.querySelector(".rec-prism") as HTMLElement;
  if (prism) {
    prism.style.transform = "translateZ(-100px) rotateX( -90deg)";
  }
}

export const showContactUs = () => {
  const prism = document.querySelector(".rec-prism") as HTMLElement;
  if (prism) {
    prism.style.transform = "translateZ(-100px) rotateY( 90deg)";
  }
}

export const showThankYou = () => {
  const prism = document.querySelector(".rec-prism") as HTMLElement;
  if (prism) {
    prism.style.transform = "translateZ(-100px) rotateX( 90deg)";
  }
}

export default function Login() {

    const [connect, setConnect] = useState<LoginDTO>();
    const [status, setStatus] = useState<boolean>(false);
    const navigate = useNavigate();
  
    async function handlelogin(username: any) {
      const result = await LoginService.getInstance().username(username);
      setConnect(result);
      
      setStatus(true);
      navigate("/LandingPage");
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
      navigate("/user", { state: { username: inscription.username } });
    }

    const handleSubmitInscription = (event: any) => {
      event.preventDefault();

      const username = event.target.username.value;
      const password = event.target.elements.password.value;
  
      handleInscription({ username, password });
    };

  return (
    <div className="Login">
      <header className="Login-header">
      </header>
      <body className='tmp'>
        <ul className="nav">
          <li onClick={showSignin}>Connexion</li>
          <li onClick={showSignup}>Inscription</li>
          <li onClick={showContactUs}>Contactez-nous</li>
        </ul>
        <div className="wrapper">
          <div className="rec-prism">
            
            <div className="face face-front">
              <div className="content">
                <h2>Connexion</h2>
                <form onSubmit={handleSubmit}>
                  <div className="field-wrapper">
                    <input type="text" name="username" placeholder="nom d'utilisateur"/>
                    <label>Username</label>
                  </div>
                  <div className="field-wrapper">
                    <input type="password" name="password" placeholder="mot de passe" autoComplete="new-password"/>
                    <label>mot de passe</label>
                  </div>
                  <div className="field-wrapper">
                    <input type="submit"/>
                  </div>
                  <span className="psw" onClick={showForgotPassword}>Mot de passe oublié ? </span>
                  <span className="signup" onClick={showSignup}>Pas encore de compte ? Inscrivez-vous</span>
                </form>
              </div>
            </div>
            <div className="face face-back">
              <div className="content">
                <h2>Mot de passe oublié ?</h2>
                <small>Entrez votre username pour recevoir un lien de réinitialisation de votre mot de passe</small>
                <form onSubmit={(event) => event.preventDefault()}>
                  <div className="field-wrapper">
                    <input type="text" name="username" placeholder="e-mail"/>
                    <label>Username</label>
                  </div>
                  <div className="field-wrapper">
                    <input type="submit" onClick={showThankYou}/>
                  </div>
              </form>
              </div>
            </div>
            <div className="face face-right">
              <div className="content">
                <h2>Inscription</h2>
                <form onSubmit={handleSubmitInscription}>
                  <div className="field-wrapper">
                    <input type="text" name="username" placeholder="username"/>
                    <label>Username</label>
                  </div>
                  <div className="field-wrapper">
                    <input type="password" name="password" placeholder="password" autoComplete="new-password"/>
                    <label>Mot de passe</label>
                  </div>
                  <div className="field-wrapper">
                    <input type="password" name="password2" placeholder="password" autoComplete="new-password"/>
                    <label>Entrer à nouveau votre mot de passe</label>
                  </div>
                  <div className="field-wrapper">
                    <input type="submit"/>
                  </div>
                  <span className="singin" onClick={showSignin}>Déjà utilisateur ? Connexion</span>
                </form>
              </div>
            </div>
            <div className="face face-left">
              <div className="content">
                <h2>Contactez-nous</h2>
                <form onSubmit={(event) => event.preventDefault()}>
                  <div className="field-wrapper">
                    <input type="text" name="name" placeholder="name"/>
                    <label>Nom</label>
                  </div>
                  <div className="field-wrapper">
                    <input type="text" name="username" placeholder="username"/>
                    <label>Username</label>
                  </div>
                  <div className="field-wrapper">
                    <textarea placeholder="your message"></textarea>
                    <label>Votre message</label>
                  </div>
                  <div className="field-wrapper">
                    <input type="submit" onClick={showThankYou}/>
                  </div>
                </form>
              </div>
            </div>
            <div className="face face-bottom">
              <div className="content">
                <div className="thank-you-msg">
                  Thank you!
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}
