//ajout d'un amie


import '../../css/card.css'
import {UserDTO} from "../../dto/User.dto";
import React from "react";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useLocation} from "react-router-dom";
import {FriendshipDTO} from "../../dto/Friendship.dto";
import FriendService from "../../services/Friends.Service";
import { FriendshipStatus } from '../../dto/Friendship.dto';

const FriendCard = (props: { user: UserDTO }) => {
  const { user } : { user: UserDTO } = props;

    const location = useLocation();
    const currentUsername = location.state?.username;

    const friendshipDto: FriendshipDTO = {
        senderUser: user.username,
        receiverUser: currentUsername,
        status: FriendshipStatus.ACCEPTED,
        time: '',
    };

    const deleteFriendship = () => {
        FriendService.deleteFriendship(friendshipDto)
            .then(function (response) {
                console.log(response);
            });
    }

    return (
        <div className="user-card">
          <p className="card-title">{user.username}</p>
          <button type="button" className="btn btn-card" onClick={deleteFriendship}><FontAwesomeIcon icon={faUserMinus} /></button>
        </div>
    );
}

export default FriendCard;