import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useRef, useEffect} from 'react';
import { LoginService } from './services/Login.service';
import { useNavigate } from "react-router-dom";
import { LoginDTO } from './dto/Login.dto';
import { InscriptionDTO } from './dto/Add.dto';
import { InscriptionService } from './services/Inscription.service';

function Login(){
  const [connect, setConnect] = useState<LoginDTO>();
  const [status, setStatus] = useState<boolean>(false);
  const navigate = useNavigate();

  //animation signIn signUp
  const switchersRef = useRef<NodeListOf<Element>>(null);

  useEffect(() => {
    const switchers = switchersRef.current;

    if (switchers) {
      const handleClick = function(this: HTMLElement) {
        switchers.forEach((item) =>
          item.parentElement?.classList.remove('is-active')
        );
        this.parentElement?.classList.add('is-active');
      };

      switchers.forEach((item) => {
        item.addEventListener('click', handleClick);
      });

      return () => {
        switchers.forEach((item) => {
          item.removeEventListener('click', handleClick);
        });
      };
    }

  }, []);

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
    <div className="App">
      <header className="App-header bg-light">
        <div className='mint titleMain'><h1>TurnMaster</h1> </div>
      </header>
      <main className='LandingPage-main'>
        <section className="forms-section">

          <div className="forms">
            <div className="form-wrapper is-active">
              <button type="button" className="switcher switcher-login">
                Login
                <span className="underline"></span>
              </button>
              <form className="form form-login" onSubmit={handleSubmit}>
                <fieldset>
                  <legend>Please, enter your username and password for login.</legend>
                  <div className="input-block">
                    <label htmlFor="login-email">Username</label>
                    <input id="login-email" name="username" required/>
                  </div>
                  <div className="input-block">
                    <label htmlFor="login-password">Mot de passe</label>
                    <input id="login-password" type="password" name="password" required/>
                  </div>
                </fieldset>
                <button type="submit" className="btn-login">Login</button>
              </form>
            </div>

            
            <div className="form-wrapper">
              <button type="button" className="switcher switcher-signup">
                Sign Up
                <span className="underline"></span> 
              </button>
              <form className="form form-signup" onSubmit={handleSubmitInscription}>
                <fieldset>
                  <legend>Please, enter your username, password and password confirmation for sign up.</legend>
                  <div className="input-block">
                    <label htmlFor="signup-email">E-mail</label>
                    <input id="signup-email" name="username" required/>
                  </div>
                  <div className="input-block">
                    <label htmlFor="signup-password">Password</label>
                    <input id="signup-password" name="password" type="password" required/>
                  </div>
                  <div className="input-block">
                    <label htmlFor="signup-password-confirm">Confirm password</label>
                    <input id="signup-password-confirm" type="password" required/>
                  </div>
                </fieldset>
                <button type="submit" className="btn-signup">Continue</button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Login;