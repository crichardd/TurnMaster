import '../css/conv.css';
import React, { useState } from 'react';


import {useEffect} from "react";
import FriendService from "../services/Friends.Service";
import {useLocation} from "react-router-dom";
import FriendCard from "./cards/FriendCard";
import FriendRequestCard from "./cards/FriendRequestCard"
import '../css/friends.css';
import { FriendshipDTO, FriendshipStatus } from "../dto/Friendship.dto";



function MessageComponent() {
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

  const handleFriendRequestAction = () => {
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
  }
  

  const acceptedFriends = friends.filter((friendship) => friendship.status === FriendshipStatus.ACCEPTED);
  const pendingFriends = friends.filter(
      (friendship) => friendship.status === FriendshipStatus.PENDING && friendship.receiverUser === username
  );
  return (
    <div className="conv-container">
      <div id="sidebarConv">
        <div className="sidebarMenuContent">
          <h2>Message</h2> 
          <h3>DEMANDES</h3>
            <div>
                {pendingFriends.map((friendship, index) => (
                    <FriendRequestCard
                        key={index}
                        friendship={friendship}
                        onFriendRequestAction={handleFriendRequestAction} // Pass the callback here
                    />
                ))}
            </div>
            <h3>AMIS</h3>
            <div>
            {acceptedFriends.map((friendship, index) => {
                return <FriendCard key={index} friendship={friendship} />;
            })}
            </div>
        </div>
      </div>
             
    </div>
  );
}

export default MessageComponent;
