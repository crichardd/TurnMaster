import { useLocation, useNavigate } from "react-router-dom";

function GameComponents(){


    return (
        <div>
            <form id="create-party-form">
                <label htmlFor="party-name">Nom de la partie:</label>
                <input type="text" id="party-name" name="partyName" required/>

                <label htmlFor="num-players">Nombre de joueurs:</label>
                <input type="number" id="num-players" name="numPlayers" min="2" max="8" required/>

                <label htmlFor="rules">Règles:</label>
                <textarea id="rules" name="rules" required></textarea>

                <button type="submit">Créer une partie</button>
            </form>

        </div>
    );

}

export default GameComponents;
