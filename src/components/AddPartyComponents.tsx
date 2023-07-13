import { useLocation, useNavigate } from "react-router-dom";

interface PartyProps {
    closePopup: () => void;
}

  
function AddPartyComponents(props: PartyProps){

    return (
        <div>
            <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
                <div className="card p-4 cardProfil">
                    <div className="image d-flex flex-column justify-content-center align-items-center">
                        <label className="font-bold text-lg text-white " >Account Number</label> 
                        <input type="text" placeholder="Account number" className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white"/>
                  
                        
                        <button onClick={props.closePopup} className="cancel button">‡
                            Annuler
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AddPartyComponents;
