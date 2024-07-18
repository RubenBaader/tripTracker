import { Outlet, Link } from "react-router-dom";
import "./Layout.Styles.css";

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
                    <li>
                        <Link to="/create" className="button">New</Link>
                    </li>
                </ul>
            </nav>
            < hr />
            <Outlet />
        </div>
    );
}

export default Layout;