import '../../css/card.css'
import {UserDTO} from "../../dto/User.dto";
import React from "react";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FriendCard = (props: { user: UserDTO }) => {
  const { user } : { user: UserDTO } = props;

    return (
        <div className="user-card">
          <p className="card-title">{user.username}</p>
          <button type="button" className="btn btn-card"><FontAwesomeIcon icon={faUserMinus} /></button>
        </div>
    );
}

export default FriendCard;