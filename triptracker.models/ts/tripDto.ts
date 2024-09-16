type TripDto = {
    id? : number,
    startAddress : string,
    endAddress : string,
    startTime : Date
    endTime : Date
    distanceMeters? : number
}

export default TripDto;