import '../css/sideBar.css';
import React, { useState, useEffect } from 'react';
import FriendsComponent from "./FriendsComponent";

function SideBar() {

    const [toggleState, setToggleState] = useState(false);


    const handleToggle = () => {
    setToggleState(!toggleState);
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
                <div className={`toggle-bar ${toggleState ? 'on' : 'off'}`} onClick={handleToggle}>
                    <div className="toggle-button"></div>
                </div>

                <main className="sidebar-content">
                    <h1>Amis</h1>
                    <FriendsComponent/>
                </main>
            </div>
        </div>
    );
}

export default SideBar;