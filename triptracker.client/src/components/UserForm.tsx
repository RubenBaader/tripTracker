import { useState } from "react";
import submitUser from "../hooks/SubmitUser.Hook";

const UserForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return(
        <form onSubmit={(event) => submitUser(event, email, password)}>
            <div>
                <input required type="email" name="email" onChange={e => setEmail(e.target.value)} />
                <label htmlFor="email">Email</label>
            </div>
            <div>
                <input required type="password" name="pass" onChange={e => setPassword(e.target.value)} />
                <label htmlFor="password">Password</label>
            </div>
            
            <button type='submit'>
                Submit
            </button>
        </form>
    )
}

export default UserForm;