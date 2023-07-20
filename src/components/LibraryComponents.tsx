import { useState, useEffect } from "react";
import '../css/library.css';
import '../css/popup.css';
import GameService from "../services/Game.Service";
import { Game } from "../interfaces/Game.Interface";
import { GameDTO } from "../dto/Game.dto";


function LibraryComponents(){

    const [games, setGames] = useState<Game[]>([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [addGame, setAddGame] = useState<GameDTO>();
    const [isCardPopupOpen, setIsCardPopupOpen] = useState(false); 

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
        handleAddGame({ name, nbMinPlayer, nbMaxPlayer });
        closePopup();
    };
    const handleCardClick = () => {
        setIsCardPopupOpen(true);
      };
    
      const handleCardPopupClose = () => {
        setIsCardPopupOpen(false);
      };
  
    return (
        <div className="gameWrapper">

            <h2 className="gameH2"><strong>All Games( {games.length} )</strong></h2>

            <div className="cards">
                {games.map((game, index) => (
                    <div className="card" key={index} onClick={handleCardClick}>
                        <img
                        className="gameImg"
                        src="https://developpement-web-facile.com/wp-content/uploads/2020/12/snake-game.jpg?is-pending-load=1"
                        />
                            <label className="gameLabel">
                                {game.name} ({game.nbMinPlayer} - {game.nbMaxPlayer} joueurs)
                            </label>
                    </div>
                ))}
            </div>
            {isCardPopupOpen && (
                <div className="popUp-body">
                    <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
                        <div className="card p-4 popUp-body">
                            <div className="image d-flex flex-column justify-content-center align-items-center">
                                <label className="font-bold text-lg text-white">
                                    Account Number
                                </label>
                                <input
                                    type="text"
                                    placeholder="Account number"
                                    className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white"
                                />
                                <button onClick={handleCardPopupClose} className="cancel button cancel-button">
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            

        </div>
    );

}

export default LibraryComponents;


/*

<div className="buttonDiv">
              <button onClick={openPopup} className="buttonAddGame">Ajouter un jeu</button>
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
                                    <button type="submit" className="confirm button">Créer</button>
                                    <button onClick={closePopup} className="cancel button">Annuler</button>
                              </div>
                              
                          </form>
                      </div>
                      
                  </div>
              )}
            </div>
            
            */