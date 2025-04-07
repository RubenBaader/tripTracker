
import { useAppContext } from "../contexts/App.Context";
import NavList from "./NavList";

const Navbar = () => {
    const userLoggedIn = useAppContext().userLoggedIn;


    interface LinkProps {
        link : string,
        displayedNamed : string
    }
    const protectedLinks : LinkProps[] = [
        {
            link : "/",
            displayedNamed : "Home"
        }
    ]

    const openLinks : LinkProps[] = [
        {
            link : "/login",
            displayedNamed : "Login"
        },
        {
            link : "/create",
            displayedNamed : "Create User"
        }
    ]

    return(
        <nav>
            <NavList props={userLoggedIn ? protectedLinks : openLinks} />
        </nav>
    );
}

export default Navbar;