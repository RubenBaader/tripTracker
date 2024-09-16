
async function getGoogleRoute(origin : string, destination : string) {
    const url = "https://routes.googleapis.com/directions/v2:computeRoutes";

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json",
            "X-Goog-Api-Key" : import.meta.env.MAPS_API_KEY,
            "X-Goog-FieldMask" : "routes.distanceMeters,",
        },
        body: JSON.stringify({
            "origin":{
              // "address": "1600 Amphitheatre Parkway, Mountain View, CA"
              "address": origin
            },
            "destination":{
              // "address": "450 Serra Mall, Stanford, CA 94305, USA"
              "address": destination
            },
            "travelMode": "DRIVE",
          //   "routingPreference": "TRAFFIC_AWARE",
            "computeAlternativeRoutes": false,
            "routeModifiers": {
              "avoidTolls": false,
              "avoidHighways": false,
              "avoidFerries": false
            },
            "languageCode": "en-US",
            "units": "METRIC"
          })
    });

    // console.log("Request:", response);

    const data = await response.json();

    console.log("Response:", data);
    console.log("Route:", data.routes[0]);

    return data;
}

export default getGoogleRoute;