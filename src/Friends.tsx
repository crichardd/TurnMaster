import Header from "./header";
import CardFriends from "./components/Card";
import './css/card.css';


function Friends() {
  

    return (
        
        <div className="App">
            <Header connect={true}/>
            <main className='LandingPage-main bg-dark'>
                <CardFriends/> 
            </main>
        </div>
    );
}

export default Friends;
