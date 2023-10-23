import {useEffect, useState} from 'react';
import FriendService from "../services/Friends.Service";
import AddFriendCard from "./cards/AddFriendCard";
import '../css/friends.css';
import {FriendshipDTO} from "../dto/Friendship.dto";

import { UserService } from "../services/User.Service";
import { UserDTO } from '../dto/User.dto';
const AddFriendsComponent = ({ token }: { token: string | null }) => {
    const [nonFriends, setNonFriends] = useState<UserDTO[]>([]);
    const [friendships, setFriendships] = useState<FriendshipDTO[]>([]);
    const [currentUser, setCurrentUser] = useState<UserDTO | null>(null);    
  
    const handleReloadUsers = () => {
        if (token !== null) {
            UserService.getUserId(token)
                .then((user) => {
                    if (user && user.id) {
                        setCurrentUser(user);
                        const userUsername = user.username;


                        FriendService.getAllFriendships(token).then((friendships) => {
                            setFriendships(friendships);
                            const myFriends = new Set<string>();
                            friendships.forEach((friendship) => {
                                if (friendship.senderUsername === userUsername) {
                                    myFriends.add(friendship.receiverUsername);
                                } else {
                                    myFriends.add(friendship.senderUsername);
                                }
                            });
                        
                            UserService.getAllUsers(token).then((users) => {
                                if (users && users.length > 0) {
                                    console.log("users", users);
                                    console.log("friends", myFriends);
                                    
                                    const nonFriends = users.filter(
                                        (user) => user.username !== currentUser?.username && !myFriends.has(user.username)
                                    );
                                    console.log("currentUser?.username", currentUser?.username);
                            
                                    setNonFriends(nonFriends);
                                    console.log("nonFriends", nonFriends);
                                } else {
                                    console.log("Aucun utilisateur n'a été récupéré.");
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                            

                            
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
                console.log("nonfriends", setNonFriends(nonFriends));
                console.log("friendship", setFriendships(friendships));
                

        }
    };

    
  
    useEffect(() => {
        handleReloadUsers();
    }, [token]);
  
    return (
      <div className="friends-panel">
       <h2 className="friendsTitle">AJOUTER DES AMIS</h2>
        <div>
            
        {nonFriends.map((user, index) => {
            return (
                <div key={`${index}-${user.id}`}>
                    <AddFriendCard
                        user={user}
                        onFriendAdded={handleReloadUsers}
                        currentUserId={currentUser?.id || ''}
                        token={token}
                    />
                </div>
            );
        })}
        </div>
      </div>
    );
};
  
export default AddFriendsComponent;
