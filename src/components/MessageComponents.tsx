import '../css/conv.css';
import { useState, useEffect } from 'react';
import { GroupeService } from '../services/Groupe.Service';
import {useLocation} from "react-router-dom";
import {GroupeDTO} from "../dto/Groupe.dto";

function MessageComponent() {
  const location = useLocation();
  const currentUsername = location.state?.username;
  const [groupes, setGroupes] = useState<GroupeDTO[]>([]);

  useEffect(() => {
    
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
  }, [currentUsername]);

  return (
    <div className="conv-container">
      <div id="sidebarConv">
        <div className="sidebarMenuContent">
          <h2>Messagerie</h2>             
            <div className="content-wrapper">
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="cardMessage m-0">
                    <div className="users-container">
                      <ul className="users">
                        {groupes.map((groupe) => (
                          <li className="person" data-chat="person1">
                              <div className="user">
                                  <img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin"/>
                                  <span className="status busy"></span>
                              </div>
                              <p className="name-time">
                                  <span className="name"><li key={groupe.name}>{groupe.name}</li></span>
                              </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
        </div>
      </div>       
    </div>
  );
}

export default MessageComponent;
