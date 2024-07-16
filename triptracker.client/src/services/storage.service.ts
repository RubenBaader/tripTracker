import TripDto from '../../../triptracker.models/ts/tripDto'

/** Reqs/features:
 * db access
 * http requests
 * facilitate client <=> server data transfer 
 */

class storageService {
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

            const response = await fetch("https://localhost:7035/api/trips", {
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

            const response = await fetch("https://localhost:7035/api/user", {
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