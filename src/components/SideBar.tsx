import '../css/sideBar.css';
import { useState, useEffect } from 'react';

interface Friend {
    id: string;
    username: string;
}

function SideBar() {

    const [toggleState, setToggleState] = useState(false);
    const [friends, setFriends] = useState<Friend[]>([]);

    const handleToggle = () => {
    setToggleState(!toggleState);
    };

    useEffect(() => {
        const fetchFriends = async () => {
          const response = await fetch('http://localhost:8080/api/friendship/list');
          const data = await response.json();
          setFriends(data.friends);
        };
        fetchFriends();
    }, []);
    

    return (
        <div> 
            <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu"/>
            <label htmlFor="openSidebarMenu" className="sidebarIconToggle">
                <div className="spinner diagonal part-1"></div>
                <div className="spinner horizontal"></div>
                <div className="spinner diagonal part-2"></div>
            </label>

            <div id="sidebarMenu">
                <div className={`toggle-bar ${toggleState ? 'on' : 'off'}`} onClick={handleToggle}>
                    <div className="toggle-button"></div>
                </div>

                {friends && friends.length > 0 && toggleState ? (
                    <ul>
                        {friends.map((Friend) => (
                        <li key={Friend.username}>
                            <a href="" target="_blank">
                            {Friend.username}
                            </a>
                            <span className="cross-stand-alone"></span>
                        </li>
                        ))}
                    </ul>
                    ) : (
                    <ul>
                        {friends.map((Friend) => (
                        <li key={Friend.username}>
                            <a href="" target="_blank">
                            {Friend.username}
                            </a>
                        </li>
                        ))}
                    </ul>
                    )}

            </div>

        </div>
    );
}

export default SideBar;