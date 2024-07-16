import { useState } from "react";
import submitUser from "../hooks/SubmitUser.Hook";

const UserForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return(
        <form onSubmit={(event) => submitUser(event, name, email, password)}>
            <input type="text" name="name" onChange={e => setName(e.target.value)} />
            <input type="email" name="email" onChange={e => setEmail(e.target.value)} />
            <input type="password" name="pass" onChange={e => setPassword(e.target.value)} />
            <button type='submit'>
                Submit
            </button>
        </form>
    )
}

export default UserForm;