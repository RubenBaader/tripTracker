import TripDto from '../../../triptracker.models/ts/tripDto'

/** 
 * facilitate client-server data transfer 
 */

class storageService {
    /* Import urls from environment */
    // private readonly baseUrl = import.meta.env.VITE_SERVER_BASEURL;
    private readonly tripsUrl = import.meta.env.VITE_SERVER_BASEURL_TRIPS;
    private readonly userUrl = import.meta.env.VITE_SERVER_BASEURL_USER;
    private readonly identityUrl = import.meta.env.VITE_SERVER_IDENTITY_URL;

    /**
     * Create a post request to server in order to store the trip input in the db
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
     * Test connection
     **/
    public async test() : Promise<string> {

        const response = await fetch(import.meta.env.VITE_SERVER_BASEURL_TRIPS + "/test");
        console.log(response);
        const data = await response.json();
        return data;
    }

    /**
     * Request all trips from server
     */
    public async getTrips() {
        try {
            /* const response = await fetch(this.tripsUrl + "?" + new URLSearchParams ({
                "userId" : userId.toString()
                })
            ) */
            const response = await fetch(this.tripsUrl, {
                credentials: "include"
            })
            const data : TripDto[] = await response.json()

            // console.log(data);

            return data;
        } catch (error) {
            console.log(error);
        }
    }

    public async createUser(name : string, email : string, password : string) {
        try {
            const payload = {
                "username" : name,
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
                console.log(response);
                console.log(errorMsg);
                console.log(errorMsg.errors.DuplicateUserName[0]);
                return;
                // throw new Error(`Registration failed with status: ${response.status}`);
            }

            console.log("registration success!")

            return;
            
        } catch (error) {
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
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })

            if (!response.ok) {
                throw new Error(`Login failed with status: ${response.status}`);
            }

            const data = await response.json();

            console.log(response);
            return data;

        } catch (error) {
            console.log(error);
        }
    }
}


export default storageService;