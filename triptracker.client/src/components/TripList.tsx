import TripDto from "../../../triptracker.models/ts/tripDto";

const TripList = ({list} : {list : TripDto[] | undefined}) => {
    if (!list)
        return(<ul></ul>)
    
    const listItems = (list.map(trip => 
        <li key={trip.id}>
            from {trip.startAddress} to {trip.endAddress}
        </li>
    ))

    return(
        <ul>
            {listItems}
        </ul>
    )
}

export default TripList;