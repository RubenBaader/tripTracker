import { Outlet, Link } from "react-router-dom";
import "./Layout.Page.css";

const Layout = () => {
    return(
        <div className="app-skeleton">
            <nav>
                <ul>
                    <li>
                        <Link to="/" className="button">Home</Link>
                    </li>
                    <li>
                        <Link to="/login" className="button">Login</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </div>
    );
}

export default Layout;