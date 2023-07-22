import {useEffect, useState} from 'react';
import {UserDTO} from "../dto/User.dto";
import {useLocation} from "react-router-dom";
import FriendService from "../services/Friends.Service";
import AddFriendCard from "./cards/AddFriendCard";
import '../css/friends.css';
import {FriendshipDTO} from "../dto/Friendship.dto";

const AddFriendsComponent = () => {
    const [nonFriends, setNonFriends] = useState<UserDTO[]>([]);
    const location = useLocation();
    const currentUsername = location.state?.username;
    const [friendships, setFriendships] = useState<FriendshipDTO[]>([]);
  
    const handleReloadUsers = () => {
        FriendService.getFriendship(currentUsername).then((friendships) => {
            setFriendships(friendships);
        
            const myFriends = new Set<string>();
            friendships.forEach((friendship) => {
                if (friendship.senderUser === currentUsername) {
                    myFriends.add(friendship.receiverUser);
                } else {
                    myFriends.add(friendship.senderUser);
                }
            });
        
            FriendService.getAllUsers(currentUsername).then((usersData) => {
                const nonFriends = usersData.filter(
                    (user) => user.username !== currentUsername && !myFriends.has(user.username)
                );
        
                setNonFriends(nonFriends);
            });
        });
    };
  
    useEffect(() => {
        handleReloadUsers();
    }, [currentUsername]);
  
    return (
      <div className="friends-panel">
        <h2>AJOUTER DES AMIS</h2>
        <div>
            {nonFriends.map((user, index) => (
                <AddFriendCard
                    key={`${index}-${user.username}`}
                    user={user}
                    onFriendAdded={handleReloadUsers}
                />
            ))}
        </div>
      </div>
    );
};
  
  export default AddFriendsComponent;