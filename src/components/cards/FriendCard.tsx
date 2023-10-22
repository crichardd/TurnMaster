//ajout d'un amie
import '../../css/card.css'
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useLocation} from "react-router-dom";
import {FriendshipDTO} from "../../dto/Friendship.dto";
import FriendService from "../../services/Friends.Service";
import { FriendshipStatus } from '../../dto/Friendship.dto';

const FriendCard = (props: { friendship: FriendshipDTO }) => {
    const { friendship } : { friendship: FriendshipDTO } = props;
  
    const location = useLocation();
    const currentUsername = location.state?.username;
  
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
    
    const myFriend = friendship.receiverUsername !== currentUsername ? friendship.receiverUsername : friendship.senderUsername;
  
    return (
        <div className="user-card">
            <p className="card-title">{myFriend}</p>
            <button type="button" className="btn btn-card" onClick={deleteFriendship}><FontAwesomeIcon icon={faUserMinus} /></button> 
        </div>
    );
  }
export default FriendCard;