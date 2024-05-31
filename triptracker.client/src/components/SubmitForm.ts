import storageService from "../services/storage.service";
import TripDto from "../../../triptracker.models/tripDto";

function submitForm(startAddress : string, endAddress : string, date : Date) {
    const StorageService = new storageService();

    const trip : TripDto =  {
        StartAddress : startAddress,
        EndAddress : endAddress,
        TripDate : date
    }
    StorageService.createTrip(trip);

}

export default submitForm