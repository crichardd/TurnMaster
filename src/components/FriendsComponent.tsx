import {useEffect, useState} from "react";
import FriendService from "../services/Friends.Service";
import FriendCard from "./cards/FriendCard";
import FriendRequestCard from "./cards/FriendRequestCard";
import '../css/friends.css';
import { FriendshipDTO, FriendshipStatus } from "../dto/Friendship.dto";
import { UserService } from "../services/User.Service";
import { UserDTO } from "../dto/User.dto";

const FriendsComponent: React.FC<{ token: string | null }> = ({ token }) => {
    const [friends, setFriends] = useState<FriendshipDTO[]>([]);
    const [currentUser, setCurrentUser] = useState<UserDTO | null>(null);    

    useEffect(() => {
        if (token !== null) { 
            UserService.getUserId(token)
                .then((user) => {
                    if (user && user.id) {
                        setCurrentUser(user);
                        const userId = user.id; 

                        FriendService.getFriendship(userId, token).then((friendships) => {
                            const convertedFriendships: FriendshipDTO[] = friendships.map((friendship) => {
                                return {
                                    id: friendship.id,
                                    senderUsername: friendship.senderUsername,
                                    receiverUsername: friendship.receiverUsername,
                                    status: friendship.status as FriendshipStatus,
                                    time: friendship.time,
                                };
                            });
                            setFriends(convertedFriendships);
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [token]);

    const handleFriendRequestAction = () => {
        if (token !== null) {
            const userUsername = currentUser?.username;
            console.log("userUsername", userUsername);

            if (userUsername) {
                FriendService.getFriendship(currentUser.id, token).then((friendships) => {
                    const convertedFriendships: FriendshipDTO[] = friendships.map((friendship) => {
                        return {
                            id : friendship.id,
                            senderUsername: friendship.senderUsername,
                            receiverUsername: friendship.receiverUsername,
                            status: friendship.status as FriendshipStatus,
                            time: friendship.time,
                        };
                    });
                    setFriends(convertedFriendships);
                });
            }
        }
    }
    const acceptedFriends = friends.filter((friendship) => friendship.status === FriendshipStatus.ACCEPTED);
    const pendingFriends = friends.filter((friendship) => {
        return friendship.status === FriendshipStatus.PENDING && friendship.receiverUsername === currentUser?.username;
    });


    return (
        <div className="friends-panel">
            <h2 className="friendsTitle">AMIS</h2>
            <h3 className="friendsTitle">DEMANDES</h3>
            <div>
                {pendingFriends.map((friendship, index) => (
                    <FriendRequestCard
                        key={index}
                        friendship={friendship}
                        onFriendRequestAction={handleFriendRequestAction}
                        token={token}
                    />
                ))}
            </div>
            <h3 className="friendsTitle">AMIS</h3>
            <div>
                {acceptedFriends.map((friendship, index) => (
                    <FriendCard key={index} friendship={friendship} token={token} />
                ))}
            </div>
        </div>
    );
}

export default FriendsComponent;
