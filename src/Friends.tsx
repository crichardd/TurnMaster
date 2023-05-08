import Header from "./components/HeaderComponents";
import './css/card.css';
import SideBar from "./components/SideBar";


function Friends() {
    return (
        <div className="App">
            <Header connect={true}/>
            <main>
                <SideBar/>
            </main>
        </div>
    );
}

export default Friends;
