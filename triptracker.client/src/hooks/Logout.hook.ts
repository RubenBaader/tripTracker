import storageService from "../services/storage.service";

function logout () {
    const storage = storageService;

    storage.logout();
}

export default logout;