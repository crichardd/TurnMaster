import Header from "./header";
import CardFriends from "./components/Card";
import './css/card.css';


function Friends() {
  

    return (
        
        <div className="App">
            <div>
                <Header connect={true}/>
            </div>
            <div className="cardDiv"> 
                <CardFriends/> 
            </div>
        </div>
    );
}

export default Friends;
