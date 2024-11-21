import TripDto from '../../../triptracker.models/ts/tripDto'

/** 
 * facilitate client-server data transfer 
 */

class storageService {
    /* Import urls from environment */
    private readonly tripsUrl = import.meta.env.VITE_SERVER_BASEURL_TRIPS;
    private readonly identityUrl = import.meta.env.VITE_SERVER_IDENTITY_URL;

    /**
     * Create a post request to server to store the trip input in the db
     */
    public async createTrip (tripDto : TripDto) {
        try {
            const payload = new FormData();

            payload.append("StartAddress", tripDto.startAddress);
            payload.append("EndAddress", tripDto.endAddress);
            payload.append("StartTime", tripDto.startTime.toISOString());
            payload.append("EndTime", tripDto.endTime.toISOString());
            if (tripDto.distanceMeters)
                payload.append("DistanceMeters", tripDto.distanceMeters.toString());

            const response = await fetch(this.tripsUrl, {
                method: "POST",
                credentials: "include",
                body: payload
            })

            const data = await response.json();

            console.log(data);
            return data;
            
        } catch (error) {
            console.log(error);
        }

    }

    /**
     * Request all trips from server using user credentials
     */
    public async getTrips() {
        try {
            const response = await fetch(this.tripsUrl, {
                credentials: "include"
            })

            if (response.status == 401) {
                console.log("not authorized")
                return;
            }
            if (response.ok){
                const data : TripDto[] = await response.json()
                return data;
            }
            else {
                console.log(`Getting trips failed with status: ${response.status}`)
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    public async createUser(email : string, password : string) {
        try {
            const payload = {
                "email" : email,
                "password" : password
            }

            const response = await fetch(this.identityUrl + "/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })

            if (!response.ok) {
                const errorMsg = await response.json();
                console.log(errorMsg);
                console.log(errorMsg.errors.DuplicateUserName[0]);
                return;
            }

            console.log("registration success!")

            return;
        } 
        catch (error) {
            console.log(error);
        }
    }

    public async login (nameOrEmail : string, password : string) {
        try {
            const endPoint = this.identityUrl + "/login";
            const query = "useCookies=true";
            const requestUrl = endPoint + "?" + query;

            const payload = {
                "email": nameOrEmail,
                "password" : password
            }

            const response = await fetch(requestUrl, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })

            if (!response.ok) {
                console.log(`Login failed with status: ${response.status}`);
            }
            else {
                console.log("logged in")
            }

        } catch (error) {
            console.log(error);
        }
    }

    public async logout() {
        const endPoint = this.identityUrl + "/logout"

        const response = await fetch(endPoint, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({})
        })
        if(response.ok) {
            console.log("logged out")
        }
        else {
            console.log(`logout attempt failed with error: ${response.status}`)
        }
    }
}


export default storageService;