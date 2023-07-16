import {UserDTO} from "../dto/User.dto";
import {useEffect, useState} from "react";
import FriendService from "../services/Friends.Service";
import {useLocation} from "react-router-dom";
import FriendCard from "./cards/FriendCard";
import FriendRequestCard from "./cards/FriendRequestCard"
import '../css/friends.css';
import { FriendshipDTO, FriendshipStatus } from "../dto/Friendship.dto";

const FriendsComponent = () => {
    const [friendRequests, setFriendRequests] = useState<UserDTO[]>([]);
    const location = useLocation();
    const username = location.state?.username;
    const [friends, setFriends] = useState<FriendshipDTO[]>([])

    useEffect(() => {
        FriendService.getFriendship(username).then((friendships) => {
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
    }, [username]);
    const acceptedFriends = friends.filter((friendship) => friendship.status === FriendshipStatus.ACCEPTED);
    const pendingFriends = friends.filter((friendship) => friendship.status === FriendshipStatus.PENDING);


    return (
        <div className="friends-panel">
            <h2>AMIS</h2>
            <h3>DEMANDES</h3>
            <div>
            {pendingFriends.map((friendship, index) => (
                <FriendRequestCard key={index} friendship={friendship} />
            ))}
            </div>
            <h3>AMIS</h3>
            <div>
            {acceptedFriends.map((friendship, index) => {
                console.log("Données envoyées à FriendCard :", friendship);
                return <FriendCard key={index} friendship={friendship} />;
            })}
            </div>
        </div>
    );
}
export default FriendsComponent;