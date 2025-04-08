import TripDto from "../../../triptracker.models/ts/tripDto";
import Trip from "./Trip.Component";

const TripList = ({list} : {list : TripDto[] | undefined}) => {
    if (!list)
        return(<ul></ul>)

    const listItems = (list.map((trip, index) => 
        <Trip props={trip} index={index} />
    ))

    return(
        <ul>
            {listItems}
        </ul>
    )
}

export default TripList;