import storageService from "../services/storage.service";

async function logout (
    contextLogout : () => void
) {
    const storage = storageService;

    const loggedOutOnServer = await storage.logout();
    
    if (loggedOutOnServer) {
        contextLogout()
    }
}

export default logout;