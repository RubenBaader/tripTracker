import storageService from "../services/storage.service";
import TripDto from "../../../triptracker.models/ts/tripDto";
import { FormEvent } from "react";
import getGoogleRoute from "./GetRoute.Hook";

async function createTrip(event : FormEvent, startAddress : string, endAddress : string, date : Date) : Promise<void> {
    event.preventDefault();
    const StorageService = new storageService();

    const googleGetRoute = await getGoogleRoute(startAddress, endAddress);

    const trip : TripDto =  {
        startAddress : startAddress,
        endAddress : endAddress,
        startTime : date,
        endTime : date,
        distanceMeters : googleGetRoute["distanceMeters"]
    }

    StorageService.createTrip(trip);

}

export default createTrip
