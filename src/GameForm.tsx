import React from "react";

function GameForm() {
  // Votre logique de formulaire ici

  return (
    <div>
      <p>Créer une partie </p>
      <div className="login">
            <form>
              <label className='loginLabel' htmlFor="chk" aria-hidden="true"> Nom</label>
              <input className='loginInput' type="text" name="username" placeholder="username"/>
              <input className='loginInput' type="password" name="password" placeholder="password" autoComplete="new-password"/>
              <input className='loginInput' type="password" name="password2" placeholder="password" autoComplete="new-password"/>
              <button className='loginButton signUpButton' type="submit">S'incrire</button>
            </form>
          </div>
    </div>
  );
}

export default GameForm;