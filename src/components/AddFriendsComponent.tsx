import React, {useEffect, useState} from 'react';
import {UserDTO} from "../dto/User.dto";
import {useLocation} from "react-router-dom";
import FriendService from "../services/Friends.Service";
import AddFriendCard from "./cards/AddFriendCard";
import '../css/friends.css';

const AddFriendsComponent = () => {

    const [nonFriends, setNonFriends] = useState<UserDTO[]>([]);
    const location = useLocation();
    const username = location.state?.username;

    useEffect(() => {
        FriendService.getAllUsersNotFriends(username).then((data) => setNonFriends(data));
    });

    return (
        <div className="friends-panel">
            <h2>AJOUTER DES AMIS</h2>
            <div>
                {nonFriends.map((user, index) => (
                    <AddFriendCard key={index} user={user}/>
                ))}
            </div>
        </div>
    );
};

export default AddFriendsComponent;