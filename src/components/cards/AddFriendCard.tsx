import '../../css/card.css'
import {UserDTO} from "../../dto/User.dto";
import React from "react";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FriendService from "../../services/Friends.Service";
import {useLocation} from "react-router-dom";
import {FriendshipDTO} from "../../dto/Friendship.dto";
import {FriendshipStatus} from '../../dto/Friendship.dto';

const AddFriendCard = (props: { user: UserDTO }) => {
  const { user } : { user: UserDTO } = props;

    const location = useLocation();
    const currentUsername = location.state?.username;

    const friendshipDto: FriendshipDTO = {
        senderUser: user.username,
        receiverUser: currentUsername,
        status: FriendshipStatus.DECLINED ,
        time: '',
    };

    const sendRequest = () => {
        FriendService.sendFriendshipRequest(friendshipDto)
            .then(function (response) {
                console.log(response);
            });
    }

    return (
        <div className="user-card">
          <p className="card-title">{user.username}</p>
          <button type="button" className="btn btn-card" onClick={sendRequest}><FontAwesomeIcon icon={faUserPlus} /></button>
        </div>
    );
}

export default AddFriendCard;