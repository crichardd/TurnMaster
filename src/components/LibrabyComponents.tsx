import { useLocation, useNavigate } from "react-router-dom";
import '../css/library.css';
function LibraryComponents(){


    return (
        <div className="wrapper">

            <h2><strong>All Games<span>( 4 )</span></strong></h2>

            <div className="cards">

                <figure className="card">

                    <img src="https://www.linkpicture.com/q/1_1484.jpg" />

                    <figcaption>Snake</figcaption>

                </figure>

            </div>

        </div>
    );

}

export default LibraryComponents;
