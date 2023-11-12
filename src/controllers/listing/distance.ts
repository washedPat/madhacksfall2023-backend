


function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

function euclideanDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const earthRadiusInKm = 6371; // Earth radius in kilometers

    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);

    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distanceInKm = earthRadiusInKm * c;

    const distanceInMiles = distanceInKm * 0.621371;

    return distanceInMiles;
}

// const distance = euclideanDistance(37.7749, -122.4194, 34.0522, -118.2437);
// console.log(`Distance: ${distance.toFixed(2)} miles`);


