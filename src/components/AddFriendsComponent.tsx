import {useEffect, useState} from 'react';
import {UserDTO} from "../dto/User.dto";
import {useLocation} from "react-router-dom";
import FriendService from "../services/Friends.Service";
import AddFriendCard from "./cards/AddFriendCard";
import '../css/friends.css';
import {FriendshipDTO} from "../dto/Friendship.dto";

import { UserService } from "../services/User.Service";

const AddFriendsComponent = ({ token }: { token: string | null }) => {
    const [nonFriends, setNonFriends] = useState<UserDTO[]>([]);
    const [friendships, setFriendships] = useState<FriendshipDTO[]>([]);
  
    const handleReloadUsers = () => {
        if (token !== null) {
            UserService.getUserId(token)
                .then((user) => {
                    if (user && user.id) {
                        const userId = user.id; 
                        console.log("getUserId", userId);

                        FriendService.getFriendship(userId, token).then((friendships) => {
                            setFriendships(friendships);
                        
                            const myFriends = new Set<string>();
                            friendships.forEach((friendship) => {
                                if (friendship.senderUser === userId) {
                                    myFriends.add(friendship.receiverUser);
                                } else {
                                    myFriends.add(friendship.senderUser);
                                }
                            });
                        
                            FriendService.getAllUsers(token).then((usersData) => {
                                const nonFriends = usersData.filter(
                                    (user) => user.id !== userId && !myFriends.has(user.id)
                                );
                        
                                setNonFriends(nonFriends);
                            });
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };
  
    useEffect(() => {
        handleReloadUsers();
    }, [token]);
  
    return (
      <div className="friends-panel">
        <h2 className="friendsTitle">AJOUTER DES AMIS</h2>
        <div>
            {nonFriends.map((user, index) => (
                <AddFriendCard
                    key={`${index}-${user.id}`}
                    user={user}
                    onFriendAdded={handleReloadUsers}
                />
            ))}
        </div>
      </div>
    );
};
  
export default AddFriendsComponent;
