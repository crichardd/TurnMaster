import '../css/Menu.css'
import { useLocation, useNavigate } from "react-router-dom";
import '../css/button.css'

function Card(){
  const navigate = useNavigate();

  function handleMessages() {
    navigate("/Message");
  }
    return (
        <div >
          <div className="card">
            <div className="img"></div>
              <div className="textBox">
                <div className="textContent">
                  <p className="h1">Pierre</p>
                </div>
                <p className="p">1000 points</p>
                <div className="modal-footer">
                  <button type="button" className="btn btn-info" data-dismiss="modal" onClick={handleMessages}> Message</button>
                  <button type="button" className="btn btn-danger">Delete</button>
                </div>
            </div>
          </div>
        </div>
    );
}
        //        <a onClick={handleMessages} className=""> message </a>


export default Card;