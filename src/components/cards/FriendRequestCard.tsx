import '../../css/card.css'
import {UserDTO} from "../../dto/User.dto";
import React from "react";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FriendRequestCard = (props: { user: UserDTO }) => {
  const { user } : { user: UserDTO } = props;

    return (
        <div className="user-card">
          <p className="card-title">{user.username}</p>
            <div className="btn-card-container">
                <button type="button" className="btn btn-card"><FontAwesomeIcon icon={faCircleXmark} /></button>
                <button type="button" className="btn btn-card"><FontAwesomeIcon icon={faCircleCheck} /></button>
            </div>

        </div>
    );
}

export default FriendRequestCard;