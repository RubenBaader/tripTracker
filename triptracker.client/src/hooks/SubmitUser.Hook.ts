import storageService from "../services/storage.service";
import { FormEvent } from "react";

function submitUser(event : FormEvent, email : string, password : string) {
    event.preventDefault();
    const storage = new storageService();

    storage.createUser(email, password);
}

export default submitUser;