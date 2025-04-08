import TripDto from "../../../triptracker.models/ts/tripDto";
import './Trip.Styles.css';

const Trip = ({props, index} : {props : TripDto, index : number}) => {

    return(
        <li key={index} className="tripComponent">
            <div>Start: {props.startAddress} on {props.startTime.toDateString()}</div>
            <div>Destination: {props.endAddress}</div>
            <div>Distance: {props.distanceMeters}m</div>
        </li>
    )
}

export default Trip;
