import { useState, useEffect } from "react";
import '../css/library.css';
import '../css/popup.css';
import GameService from "../services/Game.Service";
import { Game } from "../interfaces/Game.Interface";
import {FriendshipDTO, FriendshipStatus} from "../dto/Friendship.dto";
import FriendService from "../services/Friends.Service";
import {useLocation} from "react-router-dom";


function LibraryComponents(){
    const location = useLocation();
    const currentUsername = location.state?.username;
    const [games, setGames] = useState<Game[]>([]);
    const [isCardPopupOpen, setIsCardPopupOpen] = useState(false); 
    const [friends, setFriends] = useState<FriendshipDTO[]>([])
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const myFriendsList = new Set<string>();

    useEffect(() => {
        const service = new GameService();
        service.getGames().then(data => {
            setGames(data);
        }).catch(error => {
            console.error(error);
        });
    }, []);

    const handleCardClick = () => {
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
    
      // Utiliser useEffect pour suivre les mises à jour de myFriendsList
    useEffect(() => {
        myFriendsList.clear(); // Effacer la liste avant de la remplir à nouveau
        selectedUsers.forEach((username) => myFriendsList.add(username));
        console.log(myFriendsList);
    }, [selectedUsers]);
    
  
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
                                    Sélectionner vos amis
                                </label>
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
                                <button className="cancel button cancel-button">
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