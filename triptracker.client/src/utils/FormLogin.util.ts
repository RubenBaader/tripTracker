import { FormEvent } from "react";
import storageService from "../services/storage.service";

async function formLogin(
    event : FormEvent, nameOrEmail : string, password : string, 
    contextUpdate : (input : string) => void, 
    setErrorMsg : (s : string | null) => void
    ) 
{
    event.preventDefault();
    const {login} = storageService;

    const isLoggedIn = await login(nameOrEmail, password);

    if (isLoggedIn) {
        contextUpdate(nameOrEmail);
    }
    else {
        setErrorMsg("Wrong username or password")
    }
}

export default formLogin;