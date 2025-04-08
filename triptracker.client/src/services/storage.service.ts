import TripDto from '../../../triptracker.models/ts/tripDto'
import TripDtoResponse from '../../../triptracker.models/ts/tripDtoResponse'


/* Import urls from environment */
const tripsUrl = import.meta.env.VITE_SERVER_BASEURL_TRIPS;
const identityUrl = import.meta.env.VITE_SERVER_IDENTITY_URL;

const storageService = {
    createTrip,
    getTrips,
    createUser,
    login,
    logout
}

async function parseDtoList(response : Response) : Promise<TripDto[]> {
    const data = await response.json();

    const dtos : TripDto[] = data.map((item : TripDtoResponse) => (
        {...item,
         startTime : new Date(item.startTime),
         endTime : new Date(item.endTime)
        }
    ))
    /* const dto : TripDto = {
        ...data,
        startTime : new Date(data.startTime),
        endTime : new Date(data.endTime),
    } */

    return dtos;
}

/**
 * Create a post request to server to store the trip input in the db
 */
async function createTrip (tripDto : TripDto) {
    try {
        const payload = new FormData();

        payload.append("StartAddress", tripDto.startAddress);
        payload.append("EndAddress", tripDto.endAddress);
        payload.append("StartTime", tripDto.startTime.toISOString());
        payload.append("EndTime", tripDto.endTime.toISOString());
        if (tripDto.distanceMeters)
            payload.append("DistanceMeters", tripDto.distanceMeters.toString());

        const response = await fetch(tripsUrl, {
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
async function getTrips() {
    try {
        const response = await fetch(tripsUrl, {
            credentials: "include"
        })

        if (response.status == 401) {
            console.log("not authorized")
            return;
        }
        if (response.ok){
            const data = await parseDtoList(response);
            // const data : TripDto[] = await response.json()
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

async function createUser(email : string, password : string) {
    try {
        const payload = {
            "email" : email,
            "password" : password
        }

        const response = await fetch(identityUrl + "/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            const errorMsg = await response.json();
            console.log(errorMsg.errors);
            console.log(errorMsg.errors.DuplicateUserName[0]);
            return false;
        }

        console.log("registration success!")

        return true;
    } 
    catch (error) {
        console.log(error);
    }
}

async function login (nameOrEmail : string, password : string) {
    try {
        const endPoint = identityUrl + "/login";
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
            return false;
        }
        else {
            console.log("logged in")
            return true;
        }

    } catch (error) {
        console.log(error);
    }
}

async function logout() {
    const endPoint = identityUrl + "/logout"

    const response = await fetch(endPoint, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({})
    })
    if(response.ok) {
        console.log("logged out")
        return true;
    }
    else {
        console.log(`logout attempt failed with error: ${response.status}`)
        return false;
    }
}


export default storageService;