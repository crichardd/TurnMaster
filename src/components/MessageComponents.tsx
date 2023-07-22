import '../css/conv.css';
import { useState, useEffect } from 'react';
import { GroupeService } from '../services/Groupe.Service';
import {useLocation} from "react-router-dom";
import {GroupeDTO} from "../dto/Groupe.dto";
import io from 'socket.io-client';
import { Socket } from 'socket.io-client';

const REST_API_URL = 'https://app-turnmasterapi-230715140732.azurewebsites.net';

function MessageComponent() {
  const location = useLocation();
  const currentUsername = location.state?.username;
  const [groupes, setGroupes] = useState<GroupeDTO[]>([]);
  const [selectedGroupe, setSelectedGroupe] = useState<GroupeDTO | null>(null);
  const [isConversationVisible, setIsConversationVisible] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null); // Utilisez directement 'Socket' sans 'DefaultEventsMap'
  const [message, setMessage] = useState('');


  useEffect(() => {

    const socket = io(`${REST_API_URL}/ws`);
    
    setSocket(socket);
    socket.on('connect', () => {
      console.log('Connexion établie avec le serveur WebSocket');
    });

    socket.on('message', (data) => {
      console.log('Message reçu du serveur:', data);
    });



    const fetchGroupes = async () => {
      try {
        const groupesData = await GroupeService.getGroupe();
        const groupesWithCurrentUser = groupesData.filter((groupe) =>
          groupe.participants.includes(currentUsername)
        );
        setGroupes(groupesWithCurrentUser);
      } catch (error) {
        console.error('Erreur lors de la récupération des groupes:', error);
      }
    };

    fetchGroupes();

    return () => {
      socket.disconnect();
    }

  }, [currentUsername]);

  const handleGroupeClick = (groupe: GroupeDTO) => {
    setSelectedGroupe(groupe);
    setIsConversationVisible(true);
  };

  const handleBackClick = () => {
    setIsConversationVisible(false);
  };

  const handleSendMessage = () => {
    if (socket && message.trim() !== '') {
      socket.emit('message', { 
        content: message,
        sender: currentUsername,
        group: selectedGroupe?.name
      });
      setMessage(''); // Effacer le message après l'envoi
    }
  };


  return (
    <div className="conv-container">
      {!isConversationVisible && (
        <div id="sidebarConv" className="show">
          <div className="sidebarMenuContent">
            <h2>Messagerie</h2>             
            <div className="content-wrapper">
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                {groupes.map((groupe, index) => (
                    <div className="cardMessage m-0" onClick={() => handleGroupeClick(groupe)} key={index}>
                      <div className="users-container">
                        <ul className="users">
                          <li className="person" data-chat="person1">
                            <div className="user">
                              <img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin"/>
                              <span className="status busy"></span>
                            </div>
                            <div className="name-time">
                              <div className="name">
                                {groupe.name}
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div> 
          </div>
        </div>
      )}
      {isConversationVisible && selectedGroupe && (
        <div className="conversation">
          <h2>Conversation avec {selectedGroupe.name}</h2>
          <div className="form-group mt-3 mb-0">
            <textarea
              className="form-control"
              rows={3}
              placeholder="Tapez votre message ici..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button onClick={handleSendMessage}>Envoyer</button>
          <button onClick={handleBackClick}>Retour</button>
        </div>
      )}
    </div>
  );
}

export default MessageComponent;
