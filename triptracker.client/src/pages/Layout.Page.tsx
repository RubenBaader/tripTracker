import { Outlet } from "react-router-dom";
import "./Layout.Styles.css";
import Navbar from "../components/Navbar.Component";

const Layout = () => {
    
    return(
        <div className="app-skeleton">
            <Navbar />
            < hr />
            <Outlet />
        </div>
    );
}

export default Layout;