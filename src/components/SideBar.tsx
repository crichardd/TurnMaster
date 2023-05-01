import '../css/sideBar.css';
import { useState } from 'react';


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

                {toggleState ? (
                    <ul>
                    <li><a href="" target="_blank"> Pierre</a><span className="cross-stand-alone"></span></li>
                    <li><a href="" target="_blank">Paul</a><span className="cross-stand-alone"></span></li>
                    <li><a href="" target="_blank">Jacques</a><span className="cross-stand-alone"></span></li>
                    <li><a href="" target="_blank">Toto</a><span className="cross-stand-alone"></span></li>
                    <li><a href="" target="_blank">Tata</a><span className="cross-stand-alone"></span></li>
                </ul>
                ) : (
                    <ul>
                        <li><a href="" target="_blank"> Pierre</a></li>
                        <li><a href="" target="_blank">Paul</a></li>
                        <li><a href="" target="_blank">Jacques</a></li>
                        <li><a href="" target="_blank">Toto</a></li>
                        <li><a href="" target="_blank">Tata</a></li>
                    </ul>
                )}
            </div>

        </div>
    );
}

export default SideBar;