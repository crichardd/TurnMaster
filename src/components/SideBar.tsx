import '../css/sideBar.css';
import { useState } from 'react';


function SideBar() {

    const [showSide1, setShowSide1] = useState(true);

    const handleClickToggle = () => {
      setShowSide1(!showSide1);
    };
    

    return (
        <div> 
            ICI
            <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu"/>
            <label htmlFor="openSidebarMenu" className="sidebarIconToggle">
                <div className="spinner diagonal part-1"></div>
                <div className="spinner horizontal"></div>
                <div className="spinner diagonal part-2"></div>
            </label>

            <div id="sidebarMenu">
                <div>
                    <button onClick={handleClickToggle}>
                        {showSide1 ? "Afficher side2" : "Afficher side1"}
                    </button>
                </div>
            
                
                {showSide1 ? (
                    <ul>
                        <li><a href="" target="_blank"> Pierre</a></li>
                        <li><a href="" target="_blank">Paul</a></li>
                        <li><a href="" target="_blank">Jacques</a></li>
                        <li><a href="" target="_blank">Toto</a></li>
                        <li><a href="" target="_blank">Tata</a></li>
                    </ul>
                ) : (
                    <ul>
                        <li><a href="" target="_blank"> Pierre</a><span className="cross-stand-alone"></span></li>
                        <li><a href="" target="_blank">Paul</a><span className="cross-stand-alone"></span></li>
                        <li><a href="" target="_blank">Jacques</a><span className="cross-stand-alone"></span></li>
                        <li><a href="" target="_blank">Toto</a><span className="cross-stand-alone"></span></li>
                        <li><a href="" target="_blank">Tata</a><span className="cross-stand-alone"></span></li>
                    </ul>
                )}
            </div>

        </div>
    );
}

export default SideBar;