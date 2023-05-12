import { useLocation, useNavigate } from "react-router-dom";

function LibraryComponents(){


    return (
        <div className="wrapper">

            <h2><strong>All Games<span>( 4 )</span></strong></h2>

            <div className="cards">

                <figure className="card">

                    <img src="https://www.linkpicture.com/q/1_1484.jpg" />

                    <figcaption>Dota 2</figcaption>

                </figure>

                <figure className="card">

                    <img src="https://www.linkpicture.com/q/2_965.jpg" />

                    <figcaption>Stick Fight</figcaption>

                </figure>

                <figure className="card">

                    <img src="https://www.linkpicture.com/q/3_695.jpg" />

                    <figcaption>Minion Masters</figcaption>

                </figure>

                <figure className="card">

                    <img src="https://www.linkpicture.com/q/4_543.jpg" />

                    <figcaption>KoseBoz!</figcaption>

                </figure>

            </div>

            <h2><strong>What's new?</strong></h2>

            <div className="news">

                <figure className="article">

                    <img src="https://www.linkpicture.com/q/news1_1.jpg" />

                    <figcaption>

                        <h3>New Item</h3>

                        <p>

                            In today’s update, two heads are better than one, and three heads are better than that, as the all-new Flockheart’s Gamble Arcana item for Ogre Magi makes its grand debut.

                        </p>

                    </figcaption>

                </figure>

                <figure className="article">

                    <img src="https://www.linkpicture.com/q/news2.png" />

                    <figcaption>

                        <h3>Update</h3>

                        <p>

                            Just in time for Lunar New Year and the Rat’s time in the cyclical place of honor, the Treasure of Unbound Majesty is now available.

                        </p>

                    </figcaption>

                </figure>

            </div>

        </div>
    );

}

export default LibraryComponents();
