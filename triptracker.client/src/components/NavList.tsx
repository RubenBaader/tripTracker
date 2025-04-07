import { Link } from "react-router-dom"
import { useAppContext } from "../contexts/App.Context"
import LogoutButton from "./LogoutButton"

interface LinkProps {
    link : string,
    displayedNamed : string
}

const NavList = ({props} : {props : LinkProps[]}) => {
    const userLoggedIn = useAppContext().userLoggedIn;
    
    if (!props)
        return(<ul></ul>)
    
    const items = (props.map((item, index) => 
        <li key={index}>
            <Link to={item.link} className="button">{item.displayedNamed}</Link>
        </li>
    ))

    return(
        <ul>
            {items}
            {userLoggedIn && 
                <li>
                    <LogoutButton className="button"/>
                </li>
            }
        </ul>
    )
}

export default NavList;