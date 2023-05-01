import '../css/sideBar.css';


function SideBar() {

    return (
        <div>
            <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu"/>
            <label htmlFor="openSidebarMenu" className="sidebarIconToggle">
                <div className="spinner diagonal part-1"></div>
                <div className="spinner horizontal"></div>
                <div className="spinner diagonal part-2"></div>
            </label>
            <div id="sidebarMenu">
                <ul className="sidebarMenuInner">
                <li>Bar de recherche <span> à venir</span></li>
                <li><a href="" target="_blank"> Pierre</a><span className="cross-stand-alone"></span></li>
                <li><a href="" target="_blank">Paul</a><span className="cross-stand-alone"></span></li>
                <li><a href="" target="_blank">Jacques</a><span className="cross-stand-alone"></span></li>
                <li><a href="" target="_blank">Toto</a><span className="cross-stand-alone"></span></li>
                <li><a href="" target="_blank">Tata</a><span className="cross-stand-alone"></span></li>
                </ul>
            </div>

        </div>
    );
}

export default SideBar;