import { TripForm } from "../components/TripForm"
import { useEffect, useState } from "react"
import TripList from "../components/TripList"
import storageService from "../services/storage.service"
import TripDto from "../../../triptracker.models/ts/tripDto"


const Home = () => {
    
    const [tripList, setTripList] = useState<TripDto[] | undefined>();
    
    useEffect(() => {
        const storage = storageService

        async function getTrips() {
            const data = await storage.getTrips();
            // console.log("data:", data);
            setTripList(data);
        }

        getTrips();
    }, [tripList]);

    return(
        <>
            <h1>View trips</h1>
            <TripList list={tripList} />
            <h1>Create Trip</h1>
            <TripForm />
        </>
    )
}

export default Home;