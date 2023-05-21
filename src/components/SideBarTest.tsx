import '../css/sideBar.css';
import React, {useState} from 'react';
import {faUserPlus, faUsers} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AddFriendsComponent from "./AddFriendsComponent";
import FriendsComponent from "./FriendsComponent";

function SidebarTest() {
    const [toggleState, setToggleState] = useState(false);

    const handleToggle = (tab:boolean) => {
        setToggleState(tab);
    };

    return (
        <div>
            <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu"/>
            <label htmlFor="openSidebarMenu" className="sidebarIconToggle">
                <div className="spinner diagonal part-1"></div>
                <div className="spinner horizontal"></div>
                <div className="spinner diagonal part-2"></div>
            </label>
            <div id="sidebarMenu">
                <div className="sidebarMenuContent">
                <div className="btn-friend-container">
                        <button className={`btn-friend ${!toggleState ? 'on' : 'off'}`} onClick={() => handleToggle(false)}>
                            <FontAwesomeIcon icon={faUsers} />
                        </button>

                        <button className={`btn-friend ${toggleState ? 'on' : 'off'}`} onClick={() => handleToggle(true)}>
                            <FontAwesomeIcon icon={faUserPlus} />
                        </button>
                </div>

                {!toggleState && <FriendsComponent/>}

                {toggleState && <AddFriendsComponent/>}

                </div>
            </div>

        </div>
    );
};

export default SidebarTest;
