import storageService from "../services/storage.service";
import TripDto from "../../../triptracker.models/ts/tripDto";
import { FormEvent } from "react";

function submitUser(event : FormEvent, startAddress : string, endAddress : string, date : Date) : void {
    event.preventDefault();
    const StorageService = new storageService();

    const trip : TripDto =  {
        startAddress : startAddress,
        endAddress : endAddress,
        startTime : date,
        endTime : date
    }
    StorageService.createTrip(trip);

}

export default submitUser