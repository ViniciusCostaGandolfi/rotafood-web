import { Coordinate } from "../interfaces/vrp";

export function getMidCoordinate(coordinates: Coordinate[]): Coordinate {
    const totalPoints = coordinates.length;
    let totalLat = 0;
    let totalLng = 0;

    coordinates.forEach(point => {
        totalLat += point.lat;
        totalLng += point.lng;
    });

    const midLat = totalLat / totalPoints;
    const midLng = totalLng / totalPoints;

    return {
        lat: midLat,
        lng: midLng
    }
}