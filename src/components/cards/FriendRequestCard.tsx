import '../../css/card.css'
import {UserDTO} from "../../dto/User.dto";
import React from "react";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useLocation} from "react-router-dom";
import FriendService from "../../services/Friends.Service";
import {FriendshipDTO} from "../../dto/Friendship.dto";

const FriendRequestCard = (props: { user: UserDTO }) => {
  const { user } : { user: UserDTO } = props;

    const location = useLocation();
    const currentUser = location.state?.username;

    const friendshipDto: FriendshipDTO = {
        senderUser: "chloe",
        receiverUser: currentUser,
    };

    function addFriend() {
        FriendService.acceptFriendshipRequest(friendshipDto)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="user-card">
          <p className="card-title">{user.username}</p>
            <div className="btn-card-container">
                <button type="button" className="btn btn-card"><FontAwesomeIcon icon={faCircleXmark} /></button>
                <button type="button" className="btn btn-card" onClick={addFriend}><FontAwesomeIcon icon={faCircleCheck} /></button>
            </div>

        </div>
    );
}

export default FriendRequestCard;