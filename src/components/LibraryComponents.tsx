import { useState, useEffect } from "react";
import '../css/library.css';
import '../css/popup.css';
import GameService from "../services/Game.Service";
import { Game } from "../interfaces/Game.Interface";
import { GameDTO } from "../dto/Game.dto";

function LibraryComponents(){

    const [games, setGames] = useState<Game[]>([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [name, setName] = useState("");
    const [addGame, setAddGame] = useState<GameDTO>();


    const handleNameChange = (event: any) => {
        setName(event.target.value);
    };

    useEffect(() => {
        const service = new GameService();
        service.getGames().then(data => {
            setGames(data);
        }).catch(error => {
            console.error(error);
        });
    }, []);


  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  async function handleAddGame(addGame: any){

    const result = await GameService.getInstance().addGame(
      addGame
    );
    setAddGame(result);
    
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const name = event.target.name.value;
    const nbMinPlayer = event.target.elements.nbMinPlayer.value;
    const nbMaxPlayer = event.target.elements.nbMaxPlayer.value;
    console.log({ name, nbMinPlayer, nbMaxPlayer });
    handleAddGame({ name, nbMinPlayer, nbMaxPlayer });
    closePopup();
  };
  
    return (
        <div className="wrapper">

            <h2><strong>All Games( {games.length} )</strong></h2>

            <div className="cards">

                {games.map(game => (

                    <figure className="card">

                        <img src="https://developpement-web-facile.com/wp-content/uploads/2020/12/snake-game.jpg?is-pending-load=1" />

                        <figcaption>{game.name} ({game.nbMinPlayer} - {game.nbMaxPlayer} joueurs)</figcaption>

                    </figure>
                ))}

            </div>
            <div className="buttonDiv">
  
            <button onClick={openPopup} className="buttonAddGame">Create Game</button>

              {isPopupOpen && (
                  <div id="container" className="popup-container">
                      <div className="popup-content popup container-inner">
                          <h3 className="h3Game">Ajouter votre Jeux</h3>
                          <form onSubmit={handleSubmit}>
                              <div className="content">
                                  <label>Nom</label>
                                  <input className="nameGameInput addGameInput" type="text" name="name" placeholder="Nom du Jeu"/>
                                  <label>De </label> 
                                  <input className="nbInput addGameInput" type="number" min="0" name="nbMinPlayer"/> 
                                  <label>à</label>
                                  <input className="nbInput addGameInput" min="0" type="number" name="nbMaxPlayer" /> 
                                  <label> Joueurs </label>
                              </div>
                              <div className="buttons">
                                  <button type="submit" className="confirm button">Create</button>
                                  <button onClick={closePopup} className="cancel button">Cancel</button>
                              </div>
                              
                          </form>
                      </div>
                  </div>
              )}
            </div>

        </div>
    );

}

export default LibraryComponents;
