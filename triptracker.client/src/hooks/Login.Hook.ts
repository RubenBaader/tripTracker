import { FormEvent } from "react";
import storageService from "../services/storage.service";

function login(event : FormEvent, nameOrEmail : string, password : string) {
    event.preventDefault();
    const storage = new storageService();

    storage.login(nameOrEmail, password);
}

export default login;