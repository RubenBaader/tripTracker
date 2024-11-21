import LoginForm from "../components/LoginForm";
import LogoutButton from "../components/LogoutButton";


const Login = () => {
    return(
        <>
            <h1>Login</h1>
            <LoginForm />
            <p>or logout?</p>
            <LogoutButton />
        </>
    )
}

export default Login;