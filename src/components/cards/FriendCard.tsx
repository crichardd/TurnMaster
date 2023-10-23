//ajout d'un amie
import '../../css/card.css'
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {FriendshipDTO} from "../../dto/Friendship.dto";
import FriendService from "../../services/Friends.Service";
import { FriendshipStatus } from '../../dto/Friendship.dto';
import {useEffect, useState} from "react";
import { UserService } from "../../services/User.Service";
import { UserDTO } from "../../dto/User.dto";


const FriendCard = (props: { friendship: FriendshipDTO, token: string | null }) => {
    const { friendship, token } = props;
    const [currentUser, setCurrentUser] = useState<UserDTO | null>(null);   

    useEffect(() => {
      if (token !== null) { 
          UserService.getUserId(token)
              .then((user) => {
                  if (user && user.id) {
                      setCurrentUser(user);
                  }
              })
              .catch((error) => {
                  console.error(error);
              }
          );

        }
    });
  
    const friendshipDtoDelete: FriendshipDTO = {
        id: friendship.id,
        senderUsername: friendship.senderUsername,
        receiverUsername: friendship.receiverUsername,
        status: FriendshipStatus.DECLINED,
        time: '',
    };
    
    const deleteFriendship = () => {
        FriendService.deleteFriendship(friendshipDtoDelete)
            .then(function (response) {
                console.log(response);
            });
    }
    const myFriend = friendship.receiverUsername !== currentUser?.username ? friendship.receiverUsername : friendship.senderUsername;
  
    return (
        <div className="user-card">
            <p className="card-title">{myFriend}</p>
            <button type="button" className="btn btn-card" onClick={deleteFriendship}><FontAwesomeIcon icon={faUserMinus} /></button> 
        </div>
    );
  }
export default FriendCard;