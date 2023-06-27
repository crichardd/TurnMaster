import React from "react";
import queryString from "query-string";

function GameForm(props: any) {
    const { search } = props.location;
    const { name, min, max } = queryString.parse(search);
  
    return (
        <div>
            <p>Créer une partie pour le jeu {name}</p>
            <div className="login">
                <form>
                    <label className='loginLabel' htmlFor="chk" aria-hidden="true">Nom</label>
                    <input className='loginInput' type="text" name="username" placeholder="username" />
                    
                    <button className='loginButton signUpButton' type="submit">S'inscrire</button>
                </form>
            </div>
        </div>
    );
  } 

export default GameForm;