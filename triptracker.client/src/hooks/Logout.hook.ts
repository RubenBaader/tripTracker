import storageService from "../services/storage.service";

function logout () {
    const storage = new storageService();

    storage.logout();
}

export default logout;