import logout from "../hooks/Logout.hook"

const LogoutButton : React.FunctionComponent = () => {
    return(
        <button onClick={logout}>Logout</button>
    )
}

export default LogoutButton;