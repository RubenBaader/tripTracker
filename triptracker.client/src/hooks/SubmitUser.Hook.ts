import storageService from "../services/storage.service";
import { FormEvent } from "react";

function submitUser(event : FormEvent, name : string, email : string, password : string) {
    event.preventDefault();
    const storage = new storageService();

    storage.createUser(name, email, password);
}

export default submitUser;