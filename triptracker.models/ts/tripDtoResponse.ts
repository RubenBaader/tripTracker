type TripDtoResponse = {
    id? : number,
    startAddress : string,
    endAddress : string,
    startTime : string
    endTime : string
    distanceMeters? : number
}

export default TripDtoResponse;