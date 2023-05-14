import { useState, useEffect } from "react";
import '../css/library.css';
import GameService from "../services/Game.Service";

function LibraryComponents(){

    const [games, setGames] = useState([]);

    useEffect(() => {
      GameService.getGames().then((response) => {
        setGames(response.data);
      });
    }, []);


    return (
        <div className="wrapper">

            <h2><strong>All Games( 1 )</strong></h2>

            <div className="cards">

                <figure className="card">

                    <img src="https://developpement-web-facile.com/wp-content/uploads/2020/12/snake-game.jpg?is-pending-load=1" />

                    <figcaption>1 joueurs</figcaption>

                </figure>

            </div>

        </div>
    );

}

export default LibraryComponents;
