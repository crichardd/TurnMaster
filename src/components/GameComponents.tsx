import { useLocation, useNavigate } from "react-router-dom";

import { useState, useRef, useEffect} from 'react';
import { PartyService } from '../services/CreateParty.Service';
import { PartyDTO } from '../dto/CreateParty.dto';

function GameComponents(){

    const navigate = useNavigate();
    const location = useLocation();
    const [partyName, setPartyName] = useState('');
    const [numPlayers, setNumPlayers] = useState(2);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const party = new PartyDTO(partyName, location.state.username, numPlayers);
        try {
            const response = await PartyService.createParty(party);
            navigate('/party/' + response.partyId);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form id="create-party-form" onSubmit={handleSubmit}>
                <label htmlFor="party-name">Nom de la partie:</label>
                <input type="text" id="party-name" name="partyName" required/>

                <label htmlFor="num-players">Nombre de joueurs:</label>
                <input type="number" id="num-players" name="numPlayers" min="2" max="8" required/>

                <button type="submit">Créer une partie</button>
            </form>

        </div>
    );

}

export default GameComponents;
