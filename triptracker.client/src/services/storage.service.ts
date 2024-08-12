import TripDto from '../../../triptracker.models/ts/tripDto'

/** 
 * facilitate client-server data transfer 
 */

class storageService {
    /* Import urls from environment */
    private readonly baseUrl = import.meta.env.VITE_SERVER_BASEURL;
    private readonly tripsUrl = import.meta.env.VITE_SERVER_BASEURL_TRIPS;
    private readonly userUrl = import.meta.env.VITE_SERVER_BASEURL_USER;

    /**
     * Create a post request to server in order to store the trip input in the db
     */
    public async createTrip (tripDto : TripDto) {
        try {
            const payload = new FormData();

            payload.append("StartAddress", tripDto.StartAddress);
            payload.append("EndAddress", tripDto.EndAddress);
            payload.append("StartTime", tripDto.StartTime.toISOString());
            payload.append("EndTime", tripDto.EndTime.toISOString());

            const response = await fetch(this.tripsUrl, {
                method: "POST",
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
    public getTrips(userId : number) : TripDto[] {
        console.log(userId);
        const trips : TripDto[] = [];
        return trips;
    }

    public async createUser(name : string, email : string, password : string) {
        try {
            const payload = new FormData();

            payload.append("Name", name);
            payload.append("Email", email);
            payload.append("Password", password);

            const response = await fetch(this.userUrl, {
                method: "POST",
                body: payload
            })

            const data = await response.json();

            console.log(data);
            return data;
            
        } catch (error) {
            console.log(error);
        }

    }

    public async login (nameOrEmail : string, password : string) {
        try {
            const payload = new FormData();

            payload.append("NameOrEmail", nameOrEmail);
            payload.append("Password", password);

            const response = await fetch(this.userUrl + "/login", {
                method: "POST",
                body: payload
            })

            const data = await response.json();

            console.log(data);
            return data;

        } catch (error) {
            console.log(error);
        }
    }
}


export default storageService;