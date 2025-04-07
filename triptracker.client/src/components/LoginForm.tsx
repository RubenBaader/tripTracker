import { useState } from "react"
import formLogin from "../utils/FormLogin.util";
import { useAppContext } from "../contexts/App.Context";

const LoginForm = () => {
    const [nameOrEmail, setNameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { login } = useAppContext();

    return (
        <form onSubmit={(event) => formLogin(event, nameOrEmail, password, login, setError)}>
            <div>
                <input name="nameOrEmail" onChange={e => setNameOrEmail(e.target.value)} />
                <label htmlFor="nameOrEmail">Name or Email</label>
            </div>

            <div>
                <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
                <label htmlFor="password">Password</label>
            </div>

            <button type='submit'>
                Submit
            </button>
            {error ? <p>{error}</p> : null}
        </form>
    )
}

export default LoginForm;