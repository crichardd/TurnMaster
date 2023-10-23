import '../../css/card.css'
import {UserDTO} from "../../dto/User.dto";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FriendService from "../../services/Friends.Service";
import {useLocation} from "react-router-dom";
import { useState, useEffect} from 'react';

const AddFriendCard = ({ user, onFriendAdded, currentUserId, token }: { user: UserDTO, onFriendAdded: () => void, currentUserId: string, token: string | null }) => {
    const location = useLocation();
    const [reloadComponent, setReloadComponent] = useState(false);

    console.log("currentUserId", currentUserId);
  
  
    const sendRequest = () => {
        if(token != null){
            FriendService.sendFriendshipRequest(token, currentUserId, user.id).then(function (response) {
                console.log(response);
                onFriendAdded();
            });
        }
        
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