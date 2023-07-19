//une demande d'ami
import '../../css/card.css'
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useLocation} from "react-router-dom";
import { useState } from 'react';
import FriendService from "../../services/Friends.Service";
import {FriendshipDTO} from "../../dto/Friendship.dto";
import { FriendshipStatus } from '../../dto/Friendship.dto';

const FriendRequestCard = (props: { friendship: FriendshipDTO, onFriendRequestAction: () => void }) => {
    const { friendship, onFriendRequestAction } : { friendship: FriendshipDTO, onFriendRequestAction: () => void } = props;
    const [reloadComponent, setReloadComponent] = useState(false);
    const location = useLocation();
    const currentUsername = location.state?.username;
  
    const friendshipDto: FriendshipDTO = {
        senderUser: friendship.senderUser,
        receiverUser: currentUsername,
        status: FriendshipStatus.PENDING,
        time: '',
    };
    const acceptRequest = () => {
        FriendService.acceptFriendshipRequest(friendshipDto)
          .then(function (response) {
                console.log(response);
                onFriendRequestAction(); // Call the callback to trigger the reload
                setReloadComponent(true); // Set the reloadComponent state to true
          });
      }
    
      const declineRequest = () => {
        FriendService.declineFriendshipRequest(friendshipDto)
          .then(function (response) {
                console.log(response);
                onFriendRequestAction(); // Call the callback to trigger the reload
                setReloadComponent(true); // Set the reloadComponent state to true
          });
      }
    const myFriend = friendship.receiverUser !== currentUsername ? friendship.receiverUser : friendship.senderUser;
  
    return (
          <div className="user-card">
            <p className="card-title">{myFriend}</p>
              <div className="btn-card-container">
                  <button type="button" className="btn-friends" onClick={declineRequest}><FontAwesomeIcon icon={faCircleXmark} /></button>
                  <button type="button" className="btn-friends" onClick={acceptRequest}><FontAwesomeIcon icon={faCircleCheck} /></button>
              </div>
  
          </div>
      );
  }
  
  export default FriendRequestCard;