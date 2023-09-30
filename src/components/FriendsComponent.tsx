import {useEffect, useState} from "react";
import FriendService from "../services/Friends.Service";
import FriendCard from "./cards/FriendCard";
import FriendRequestCard from "./cards/FriendRequestCard"
import '../css/friends.css';
import { FriendshipDTO, FriendshipStatus } from "../dto/Friendship.dto";
import { UserService } from "../services/User.Service";

const FriendsComponent: React.FC<{ token: string | null }> = ({ token }) => {
    const [friends, setFriends] = useState<FriendshipDTO[]>([]);

    useEffect(() => {
        if (token !== null) { 
            UserService.getUserId(token)
                .then((user) => {
                    if (user && user.id) {
                        const userId = user.id; 
                        console.log("getUserId", userId);
                        console.log("le token", token);

                        FriendService.getFriendship(userId, token).then((friendships) => {
                            const convertedFriendships: FriendshipDTO[] = friendships.map((friendship) => {
                                return {
                                    senderUser: friendship.senderUser,
                                    receiverUser: friendship.receiverUser,
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
            UserService.getUserId(token)
                .then((user) => {
                    if (user && user.id) {
                        const userId = user.id; 
                        console.log("getUserId", userId);
                        console.log("le token", token);

                        // Step 2: Utilisez l'ID de l'utilisateur et le token pour obtenir la liste des amitiés
                        FriendService.getFriendship(userId, token).then((friendships) => {
                            const convertedFriendships: FriendshipDTO[] = friendships.map((friendship) => {
                                return {
                                    senderUser: friendship.senderUser,
                                    receiverUser: friendship.receiverUser,
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
    }

    const acceptedFriends = friends.filter((friendship) => friendship.status === FriendshipStatus.ACCEPTED);
    const pendingFriends = friends.filter(
        (friendship) => friendship.status === FriendshipStatus.PENDING
    );

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
                    />
                ))}
            </div>
            <h3 className="friendsTitle">AMIS</h3>
            <div>
            {acceptedFriends.map((friendship, index) => {
                return <FriendCard key={index} friendship={friendship} />;
            })}
            </div>
        </div>
    );
}
export default FriendsComponent;
