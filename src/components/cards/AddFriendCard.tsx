import '../../css/card.css'
import {UserDTO} from "../../dto/User.dto";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FriendService from "../../services/Friends.Service";
import {useLocation} from "react-router-dom";
import {FriendshipDTO} from "../../dto/Friendship.dto";
import {FriendshipStatus} from '../../dto/Friendship.dto';
import { useState, useEffect} from 'react';

const AddFriendCard = ({ user, onFriendAdded }: { user: UserDTO, onFriendAdded: () => void }) => {
    const location = useLocation();
    const currentUsername = location.state?.username;
    const [reloadComponent, setReloadComponent] = useState(false);
  
    const friendshipDto: FriendshipDTO = {
        id: user.id,
        senderUsername: currentUsername,
        receiverUsername: user.username,
        status: FriendshipStatus.DECLINED,
        time: '',
    };
  
    const sendRequest = () => {
        FriendService.sendFriendshipRequest(friendshipDto).then(function (response) {
            console.log(response);
            onFriendAdded();
        });
    };    
      
    useEffect(() => {
        if (reloadComponent) {
            setReloadComponent(false);
        }
    }, [reloadComponent]);
  
    return (
        <div className="user-card">
            <p className="card-title">{user.username}</p>
            <button type="button" className="btn-friends" onClick={sendRequest}>
                <FontAwesomeIcon icon={faUserPlus} aria-hidden="true"/>
            </button>
        </div>
    );
  };
  

export default AddFriendCard;

//onClick={sendRequest}