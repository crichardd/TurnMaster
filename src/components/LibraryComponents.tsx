import { useState, useEffect } from "react";
import '../css/library.css';
import '../css/popup.css';
import { GameDTO } from "../dto/Game.dto";
import GameService from "../services/Game.Service";
import {useLocation} from "react-router-dom";
import { PartyService } from "../services/Party.service";
import { PartyDTO } from "../dto/Party.dto";

const LibraryComponents: React.FC<{ token: string | null }> = ({ token }) => {
    const location = useLocation();
    const currentUsername = location.state?.username;
    const [games, setGames] = useState<GameDTO[]>([]);
    const [gameData, setGameData] = useState<GameDTO[]>([]);
    const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);
    const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState<GameDTO | null>(null);
    const [isJoinParty, setIsJoinParty] = useState(false);
    const [code, setCode] = useState("");

    useEffect(() => {
        const service = new GameService();
        if (token !== null) {
        service
          .getGames(token)
          .then((data) => {
            setGames(data);
          })
          .catch((error) => {
            console.error(error);
          });
        }
    }, []);


    const handleCardClick = (game: GameDTO) => {
        setSelectedGame(game); 
        setIsCardPopupOpen(true);
    };
    
    const handleCardPopupClose = () => {
        setIsCardPopupOpen(false);
    };

    const handleCreateGame = async () => {
        setIsCreatePopupOpen(true);
    }

    const handleCreatePopupClose = () => {
        setIsCreatePopupOpen(false);
    };

    const handleCreateParty = async () => {
        if (!selectedGame) return;
        const partyData: PartyDTO = {
            gameName: selectedGame.name,
            username: currentUsername,
        };

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

    async function handleCreate(addGame: any) {
        if(addGame!= null && token != null){
            
            const result = await GameService.getInstance().addGame(addGame, token);
            if(result){setGameData([result]);}
            handleCreatePopupClose();
                
            
        }
    }
    
  
    const handleGameCreation = (event: any) => { 
        event.preventDefault();
  
        const name = event.target.name.value;
        const nbMinPlayer = parseInt(event.target.nbMinPlayer.value, 10);
        const nbMaxPlayer = parseInt(event.target.nbMaxPlayer.value, 10);
        const imagePath = event.target.imagePath.files[0];
        const executablePath = event.target.executablePath.files[0];
    
        handleCreate({ name, nbMinPlayer, nbMaxPlayer, imagePath, executablePath});
      };

    return (
        <div className="gameWrapper">

            <h2 className="gameH2"><strong>Tous les jeux ( {games.length} )</strong></h2>

            <div className="wrap-cards">
                {games.map((game, index) => (
                    <div className="card" key={index} onClick={() => handleCardClick(game)}>
                        <img className="gameImg" src="./../img/morpion.png" alt={game.name} />
                        <label className="gameLabel">
                            {game.name} ({game.nbMinPlayer} - {game.nbMaxPlayer} joueurs)
                        </label>
                    </div>
                ))}
            </div> 
            {isCardPopupOpen && selectedGame &&(
                <div className="popUp-body">
                    <div className="container flex justify-content-center">
                        <div className="p-4 card-pop-up">
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
            {isCreatePopupOpen && (
                <div className="popUp-body-create-game">
                    <div className="container flex justify-content-center">
                        <div className="p-4 card-pop-up">
                            <div className="image d-flex flex-column justify-content-center align-items-center">
                                <h3>Ajouter un nouveau jeu</h3>
                                <form onSubmit={handleGameCreation}>
                                    <div className="form-group">
                                        <label htmlFor="name">Nom du jeu:</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="nbMinPlayer">Nombre minimum de joueurs:</label>
                                        <input
                                            type="number"
                                            id="nbMinPlayer"
                                            name="nbMinPlayer"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="nbMaxPlayer">Nombre maximum de joueurs:</label>
                                        <input
                                            type="number"
                                            id="nbMaxPlayer"
                                            name="nbMaxPlayer"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="imagePath">Image du jeu:</label>
                                        <input
                                            type="file"
                                            id="imagePath"
                                            name="imagePath"
                                            accept=".png, .jpg, .jpeg, .gif"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="executablePath">Exécutable du jeu:</label>
                                        <input
                                            type="file"
                                            id="executablePath"
                                            name="executablePath"
                                            accept=".exe, .py"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="button cancel-buttony">Ajouter le jeu</button>
                                </form>
                                <button onClick={handleCreatePopupClose} className="cancel button cancel-button">
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}



            <div className="button-create-game">
                <button className="cancel button cancel-button" onClick={() => handleCreateGame()}> 
                    Ajouter un jeu
                </button>
            </div> 

        </div>
    );

}

export default LibraryComponents;
