import '../css/sideBar.css';
import { useState } from 'react';


function SideBar() {

    const [showSide1, setShowSide1] = useState(true);

    const handleClick1 = () => {
      setShowSide1(true);
    };
  
    const handleClick2 = () => {
      setShowSide1(false);
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
                    <button onClick={handleClick1}>Afficher side1</button>
                    <button onClick={handleClick2}>Afficher s</button>
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