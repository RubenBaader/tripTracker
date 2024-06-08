import storageService from "../services/storage.service";
import TripDto from "../../../triptracker.models/ts/tripDto";
import { FormEvent } from "react";

function submitForm(event : FormEvent, startAddress : string, endAddress : string, date : Date) {
    event.preventDefault();
    const StorageService = new storageService();

    const trip : TripDto =  {
        StartAddress : startAddress,
        EndAddress : endAddress,
        TripDate : date
    }
    StorageService.createTrip(trip);

}

export default submitForm