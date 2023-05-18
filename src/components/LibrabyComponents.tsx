import { useState, useEffect } from "react";
import '../css/library.css';
import GameService from "../services/Game.Service";
import { Game } from "../interfaces/Game.Interface";

function LibraryComponents(){

    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        const service = new GameService();
        service.getGames().then(data => {
            setGames(data);
        }).catch(error => {
            console.error(error);
        });
    }, []);


    return (
        <div className="wrapper">

            <h2><strong>All Games( {games.length} )</strong></h2>

            <div className="cards">

                {games.map(game => (

                    <figure className="card">

                        <img src="https://developpement-web-facile.com/wp-content/uploads/2020/12/snake-game.jpg?is-pending-load=1" />

                        <figcaption>{game.name} ({game.nbMinPlayer} - {game.nbMaxPlayer} joueurs)</figcaption>

                    </figure>
                ))}

            </div>

        </div>
    );

}

export default LibraryComponents;
