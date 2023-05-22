import '../../css/card.css'
import {UserDTO} from "../../dto/User.dto";
import React from "react";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddFriendCard = (props: { user: UserDTO }) => {
  const { user } : { user: UserDTO } = props;

    return (
        <div className="user-card">
          <p className="card-title">{user.username}</p>
          <button type="button" className="btn btn-card" ><FontAwesomeIcon icon={faUserPlus} /></button>
        </div>
    );
}

export default AddFriendCard;