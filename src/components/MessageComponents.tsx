import '../css/conv.css';
import React, { useState, useEffect } from 'react';
import GroupeService from "../services/Groupe.Service";
import {useLocation} from "react-router-dom";
import '../css/conv.css';

function MessageComponent() {
  const location = useLocation();
  const currentUsername = location.state?.username;

  return (
    <div className="conv-container">
      <div id="sidebarConv">
        <div className="sidebarMenuContent">
          <h2>Messagerie</h2> 

        </div>
      </div>
             
    </div>
  );
}

export default MessageComponent;
