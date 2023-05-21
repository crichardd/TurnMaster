import {UserDTO} from "../dto/User.dto";
import {useEffect, useState} from "react";
import FriendService from "../services/Friends.Service";
import {useLocation} from "react-router-dom";
import FriendCard from "./cards/FriendCard";
import FriendRequestCard from "./cards/FriendRequestCard"
import '../css/friends.css';

const FriendsComponent = () => {
    const [users, setUsers] = useState<UserDTO[]>([]);
    const [friendRequests, setFriendRequests] = useState<UserDTO[]>([]);
    const location = useLocation();
    const username = location.state?.username;

    useEffect(() => {
        FriendService.getAllFriends(username).then((data) => setUsers(data));
    });

    useEffect(() => {
        FriendService.getAllFriendRequests(username).then((data) => setFriendRequests(data));
    });

    return (
        <div className="friends-panel">
            <h2>AMIS</h2>
            <h3>DEMANDES</h3>
            <div>
                {friendRequests.map((user, index) => (
                    <FriendRequestCard key={index} user={user}/>
                ))}
            </div>
            <h3>AMIS</h3>
            <div>
                {users.map((user, index) => (
                    <FriendCard key={index} user={user}/>
                ))}
            </div>
        </div>
    );
}
export default FriendsComponent;