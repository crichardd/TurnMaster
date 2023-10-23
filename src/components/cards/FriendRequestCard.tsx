//une demande d'ami
import '../../css/card.css'
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useLocation} from "react-router-dom";
import { useState, useEffect } from 'react';
import FriendService from "../../services/Friends.Service";
import {FriendshipDTO} from "../../dto/Friendship.dto";
import { FriendshipStatus } from '../../dto/Friendship.dto';
import { UserDTO } from '../../dto/User.dto';
import { UserService } from '../../services/User.Service';

const FriendRequestCard: React.FC<{ 
  friendship: FriendshipDTO, 
  onFriendRequestAction: () => void,
  token: string | null,
}> = (props) => {
  const [reloadComponent, setReloadComponent] = useState(false);
  const { friendship, onFriendRequestAction, token } = props;
  const [currentUser, setCurrentUser] = useState<UserDTO | null>(null);   

  useEffect(() => {
    if (token !== null) { 
        UserService.getUserId(token)
            .then((user) => {
                if (user && user.id) {
                    setCurrentUser(user);
                    const userId = user.id; 
                }
            })
            .catch((error) => {
                console.error(error);
            }
        );
    }
}, [token]);

  const acceptRequest = () => {
      if (token !== null) {
          FriendService.acceptFriendshipRequest(friendship.id, token)
              .then(function (response) {
                  console.log(response);
                  onFriendRequestAction(); 
                  setReloadComponent(true); 
              });
      }
  }
  
  const declineRequest = () => {
    if(currentUser!= null){
      const friendshipDto: FriendshipDTO = {
          id: friendship.id,
          senderUsername: friendship.senderUsername,
          receiverUsername: currentUser?.username,
          status: FriendshipStatus.PENDING,
          time: '',
      };
    

      FriendService.declineFriendshipRequest(friendshipDto)
          .then(function (response) {
              console.log(response);
              onFriendRequestAction();
              setReloadComponent(true); 
          });
    }
  }

  const myFriend = friendship.senderUsername;

  return (
      <div className="user-card">
          <p className="card-title">{myFriend}</p>
          <div className="btn-card-container">
              <button type="button" className="btn-friends" onClick={declineRequest}>
                  <FontAwesomeIcon icon={faCircleXmark} />
              </button>
              <button type="button" className="btn-friends" onClick={acceptRequest}>
                  <FontAwesomeIcon icon={faCircleCheck} />
              </button>
          </div>
      </div>
  );
}

export default FriendRequestCard;