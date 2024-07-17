import { useState } from "react"
import login from "../hooks/Login.Hook";

const LoginForm = () => {
    const [nameOrEmail, setNameOrEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form onSubmit={(event) => login(event, nameOrEmail, password)}>
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
        </form>
    )
}

export default LoginForm;