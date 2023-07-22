import { useState, useEffect } from "react";
import '../css/library.css';
import '../css/popup.css';
import { GameDTO } from "../dto/Game.dto";
import GameService from "../services/Game.Service";
import {FriendshipDTO, FriendshipStatus} from "../dto/Friendship.dto";
import FriendService from "../services/Friends.Service";
import {useLocation} from "react-router-dom";
import { PartyService } from "../services/Party.service";
import { PartyDTO } from "../dto/Party.dto";

function LibraryComponents(){
    const location = useLocation();
    const currentUsername = location.state?.username;
    const [games, setGames] = useState<GameDTO[]>([]);
    const [isCardPopupOpen, setIsCardPopupOpen] = useState(false); 
    const [friends, setFriends] = useState<FriendshipDTO[]>([])
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const myFriendsList = new Set<string>();
    const [selectedGame, setSelectedGame] = useState<GameDTO | null>(null); 
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    
    useEffect(() => {
        FriendService.getFriendship(currentUsername).then((friendships) => {
            const convertedFriendships: FriendshipDTO[] = friendships.map((friendship) => {
                return {
                    senderUser: friendship.senderUser,
                    receiverUser: friendship.receiverUser,
                    status: friendship.status as FriendshipStatus,
                    time: friendship.time,
                };
            });
            setFriends(convertedFriendships);
        });
    }, [currentUsername]);
    const acceptedFriends = friends.filter((friendship) => friendship.status === FriendshipStatus.ACCEPTED);

    const handleUserSelection = (username: string) => {
        setSelectedUsers((prevSelectedUsers) =>
            prevSelectedUsers.includes(username)
                ? prevSelectedUsers.filter((user) => user !== username)
                : [...prevSelectedUsers, username]
        );
    };
    
    useEffect(() => {
        myFriendsList.clear(); 
        selectedUsers.forEach((username) => myFriendsList.add(username));
    }, [selectedUsers]);

    const handleCreateParty = async () => {
        if (!selectedGame) return;

        const selectedParticipantsCount = Array.from(myFriendsList).length + 1; // +1 pour inclure l'utilisateur actuel

        if (selectedParticipantsCount < selectedGame.nbMinPlayer){
            console.log("pas assez")
            setErrorMessage("Vous n'avez pas sélectionner assez de participant.");
            console.error('Le nombre de participants sélectionnés ne correspond pas aux règles du jeu.');
            return;
        } else if (selectedParticipantsCount > selectedGame.nbMaxPlayer){
            console.log("trop")
            setErrorMessage("Vous avez pas sélectionner trop de participant.");
            console.error('Le nombre de participants sélectionnés ne correspond pas aux règles du jeu.');
            return;
        }
    
        const partyData: PartyDTO = {
            gameName: selectedGame.name,
            participantsUsername: [currentUsername, ...Array.from(myFriendsList)],
        };
    
        try {
            const createdParty = await PartyService.createParty(partyData);
            console.log("Partie créée avec succès:", createdParty);
            setSelectedGame(null);
            setIsCardPopupOpen(false);
        } catch (error) {
            console.error("Erreur lors de la création de la partie:", error);
        }
    };
    

    return (
        <div className="gameWrapper">

            <h2 className="gameH2"><strong>All Games( {games.length} )</strong></h2>

            <div className="cards">
                {games.map((game, index) => (
                    <div className="card" key={index} onClick={() => handleCardClick(game)}>
                        <img className="gameImg" src={game.imagePath} alt={game.name} />
                        <label className="gameLabel">
                            
                            {game.name} ({game.nbMinPlayer} - {game.nbMaxPlayer} joueurs)
                        </label>
                    </div>
                ))}
            </div> 
            {isCardPopupOpen && selectedGame &&(
                <div className="popUp-body">
                    <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
                        <div className="card p-4 popUp-body">
                            <div className="image d-flex flex-column justify-content-center align-items-center">
                                <label className="font-bold text-lg text-white">
                                    Sélectionner vos amis pour le jeu "{selectedGame.name}"
                                </label>
                                {errorMessage && <div className="loginError warning"><i className="fa fa-exclamation-triangle rotate"></i> <span>{errorMessage}</span></div>}
                                <div>
                                    {acceptedFriends.map((friendship, index) => (
                                        <label className="lns-checkbox ml-2" key={index}>
                                        <input
                                            className="CheckBoxFriends"
                                            type="checkbox"
                                            checked={selectedUsers.includes(
                                            friendship.senderUser === currentUsername
                                                ? friendship.receiverUser
                                                : friendship.senderUser
                                            )}
                                            onChange={() =>
                                            handleUserSelection(
                                                friendship.senderUser === currentUsername
                                                ? friendship.receiverUser
                                                : friendship.senderUser
                                            )
                                            }
                                        />
                                        {friendship.senderUser === currentUsername ? (
                                            <span>{friendship.receiverUser}</span>
                                        ) : (
                                            <span>{friendship.senderUser}</span>
                                        )}
                                        </label>
                                    ))}
                                    </div>
                                <button className="cancel button cancel-button" onClick={handleCreateParty}>
                                    Créer
                                </button>
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
