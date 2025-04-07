import { useAppContext } from "../contexts/App.Context";
import logout from "../utils/Logout.util"

interface buttonProp {
    className? : string
}

const LogoutButton : React.FunctionComponent<buttonProp> = ({className}) => {
    const contextLogout = useAppContext().logout;

    return(
        <button className={className} onClick={() => logout(contextLogout)}>Logout</button>
    )
}

export default LogoutButton;