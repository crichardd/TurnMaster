import '../css/conv.css';
import React, { useState, useEffect } from 'react';
import { GroupeService } from '../services/Groupe.Service';
import {useLocation} from "react-router-dom";
import '../css/conv.css';
import {GroupeDTO} from "../dto/Groupe.dto";

function MessageComponent() {
  const location = useLocation();
  const currentUsername = location.state?.username;
  const [groupes, setGroupes] = useState<GroupeDTO[]>([]);

  useEffect(() => {
    
    const fetchGroupes = async () => {
      try {
        const groupesData = await GroupeService.getGroupe();
        console.log("groupesData", groupesData)
        console.log("currentUsername", currentUsername)
        const groupesWithCurrentUser = groupesData.filter((groupe) =>
          groupe.participants.includes(currentUsername)
        );
        console.log("participants", groupesWithCurrentUser)
        setGroupes(groupesWithCurrentUser);
      } catch (error) {
        console.error('Erreur lors de la récupération des groupes:', error);
      }
    };

    fetchGroupes();
  }, [currentUsername]);

  return (
    <div className="conv-container">
      <div id="sidebarConv">
        <div className="sidebarMenuContent">
          <h2>Messagerie</h2> 
          <ul>
            {groupes.map((groupe) => (
              <li key={groupe.name}>{groupe.name}</li>
            ))}
          </ul>
        </div>
      </div>
             
    </div>
  );
}

export default MessageComponent;
