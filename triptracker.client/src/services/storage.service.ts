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
    public createTrip(trip : TripDto) {
        console.log("Hello!")
        console.log(trip);
        return trip;
    }

    public getTrips(userId : number) : TripDto[] {
        console.log(userId);
        const trips : TripDto[] = [];
        return trips;
    }
}


export default storageService;