import { useState, useEffect } from "react";
import '../css/library.css';
import '../css/popup.css';
import { GameDTO } from "../dto/Game.dto";
import GameService from "../services/Game.Service";
import {useLocation} from "react-router-dom";
import { PartyService } from "../services/Party.service";
import { PartyDTO } from "../dto/Party.dto";

function LibraryComponents(){
    const location = useLocation();
    const currentUsername = location.state?.username;
    const [games, setGames] = useState<GameDTO[]>([]);
    const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState<GameDTO | null>(null);
    const [isJoinParty, setIsJoinParty] = useState(false);
    const [code, setCode] = useState("");
  
    useEffect(() => {
        const service = new GameService();
        service
          .getGames()
          .then((data) => {
            setGames(data);
          })
          .catch((error) => {
            console.error(error);
          });
    }, []);

    const handleCardClick = (game: GameDTO) => {
        setSelectedGame(game); 
        setIsCardPopupOpen(true);
    };
    
    const handleCardPopupClose = () => {
        setIsCardPopupOpen(false);
    };

    const handleCreateParty = async () => {
        if (!selectedGame) return;
        const partyData: PartyDTO = {
            gameName: selectedGame.name,
            username: currentUsername,
        };
        console.log("test:", partyData);

        try {
            const createdParty = await PartyService.createParty(partyData);
            console.log("Partie créée avec succès:", createdParty);
            setSelectedGame(null);
            setIsCardPopupOpen(false);
            console.log("Code de retour de l'API:", createdParty.code);

        } catch (error) {
            console.error("Erreur lors de la création de la partie:", error);
        }
    };

    const handleJoinParty = async () => {
        setIsJoinParty(true);
    }
    const cancelJoinParty = () => {
        setIsJoinParty(false);
    };

    return (
        <div className="gameWrapper">

            <h2 className="gameH2"><strong>Tous les jeux ( {games.length} )</strong></h2>

            <div className="wrap-cards">
                {games.map((game, index) => (

                    /*
                    <div className="card" key={index} onClick={() => handleCardClick(game)}>
                        <img className="gameImg" src={game.imagePath} alt={game.name} />
                        <label className="gameLabel">
                            
                            {game.name} ({game.nbMinPlayer} - {game.nbMaxPlayer} joueurs)
                        </label>
                    </div>*/
                    
                    <div className="card">
                        <div className="wrap-image"><img src={game.imagePath} alt={game.name}/>
                            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                                <polygon points="0,100 100,100 100,0"></polygon>
                            </svg>
                        </div>
                        <div className="contentsGame">
                            <h3>{game.name}</h3>
                            <div className="textGame">
                                ({game.nbMinPlayer} - {game.nbMaxPlayer} joueurs)
                            </div>
                        </div>
                    </div>
                ))}
            </div> 
            {isCardPopupOpen && selectedGame &&(
                <div className="popUp-body">
                    <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
                        <div className="p-4 popUp-body card">
                            <div className="image d-flex flex-column justify-content-center align-items-center">
                                {isJoinParty ? (
                                    <>
                                        <span className="passWord mt-3">Veuillez entrer le code de partie</span>
                                        <input
                                            id="codeParty"
                                            type="texte"
                                            placeholder="code de partie"
                                            className="passwordInput mt-3"
                                        />
                                        <button onClick={cancelJoinParty} className="btn1 btn-dark ml-2 submit-feedback">
                                            Annuler
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <label className="font-bold text-lg text-white">
                                            Sélectionner vos amis pour le jeu "{}"
                                        </label>
                                        <button className="cancel button cancel-button" onClick={handleCreateParty}>
                                            Créer
                                        </button>
                                        <button className="cancel button cancel-button" onClick={handleJoinParty}>
                                            Rejoindre
                                        </button>
                                        <button onClick={handleCardPopupClose} className="cancel button cancel-button">
                                            Annuler
                                        </button>
                                    </>
                                )}
                                
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

}

export default LibraryComponents;
