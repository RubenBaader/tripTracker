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
            const response = await fetch("https://localhost:7035/api/trips", {
                method: "POST",
                body: JSON.stringify(tripDto),
            })
            console.log(response);
            return response;
            
        } catch (error) {
            console.log(error);
        }

    }

    public getTrips(userId : number) : TripDto[] {
        console.log(userId);
        const trips : TripDto[] = [];
        return trips;
    }
}


export default storageService;