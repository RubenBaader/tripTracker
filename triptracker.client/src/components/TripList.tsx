import TripDto from "../../../triptracker.models/ts/tripDto";

const TripList = ({list} : {list : TripDto[] | undefined}) => {
    if (!list)
        return(<ul></ul>)
    
    const listItems = (list.map(trip => 
        <li>
            from {trip.StartAddress} to {trip.EndAddress}
        </li>
    ))

    return(
        <ul>
            {listItems}
        </ul>
    )
}

export default TripList;