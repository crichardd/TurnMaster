import React, {useEffect, useState} from 'react';
import {UserDTO} from "../dto/User.dto";
import {useLocation} from "react-router-dom";
import FriendService from "../services/Friends.Service";
import AddFriendCard from "./cards/AddFriendCard";
import '../css/friends.css';
import {FriendshipDTO, FriendshipStatus} from "../dto/Friendship.dto";

const AddFriendsComponent = () => {

    const [nonFriends, setNonFriends] = useState<UserDTO[]>([]);
    const location = useLocation();
    const currentUsername = location.state?.username;
    const [friendships, setFriendships] = useState<FriendshipDTO[]>([]);

    useEffect(() => {
        FriendService.getFriendship(currentUsername).then((friendships) => {
            setFriendships(friendships);
    
            const myFriends = friendships.flatMap((friendship) => {
                if (friendship.senderUser === currentUsername) {
                    return friendship.receiverUser;
                } else {
                    return friendship.senderUser !== currentUsername;
                }
            });
    
            FriendService.getAllUsers(currentUsername).then((usersData) => {
                const nonFriends = usersData.filter(
                    (user) =>
                        user.username !== currentUsername && !myFriends.includes(user.username)
                );
                
                setNonFriends(nonFriends);
            });
        });
    }, [currentUsername]);
    
      
      
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