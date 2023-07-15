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

const FriendCard = (props: { friendship: FriendshipDTO }) => {
  const { friendship } : { friendship: FriendshipDTO } = props;

    const location = useLocation();
    const currentUsername = location.state?.username;

    const friendshipDtoDelete: FriendshipDTO = {
        senderUser: currentUsername,
        receiverUser: currentUsername,
        status: FriendshipStatus.ACCEPTED,
        time: '',
    };

    const deleteFriendship = () => {
        FriendService.deleteFriendship(friendshipDtoDelete)
            .then(function (response) {
                console.log(response);
            });
    }

    console.log("user", friendship)

    return (
        <div className="user-card">
          <p className="card-title">{friendship.receiverUser}</p>
          <button type="button" className="btn btn-card" onClick={deleteFriendship}><FontAwesomeIcon icon={faUserMinus} /></button>
        </div>
    );
}

export default FriendCard;