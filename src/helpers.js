import { distance, point, featureCollection, nearestPoint } from "@turf/turf";

import { setupOnClick } from "./actions";
import { fares, routes } from "./constants";

export const getRouteDistance = (start, end, data) => {
	setupOnClick();

	// Get reversed points from sessionStorage
	const reversedShapePoints = JSON.parse(
		sessionStorage.getItem("reversedShapePoints")
	);

	// Transform the route points from an array data structure to an object
	const transformedData = data.map((coord) => point([coord.lng, coord.lat]));
	const points = featureCollection(transformedData);

	const transformedReversedData = reversedShapePoints.map((coord) =>
		point([coord.lng, coord.lat])
	);
	const reversedPoints = featureCollection(transformedReversedData);

	// Get the nearest points in the route based on the marker location
	const startDetails = nearestPoint(start, points);
	const endDetails = nearestPoint(end, points);

	const reversedStartDetails = nearestPoint(start, reversedPoints);
	const reversedEndDetails = nearestPoint(end, reversedPoints);

	// get the distance between the marker and the nearest point in the route
	const startDistance = distance(start, startDetails);
	const endDistance = distance(end, endDetails);

	const reversedStartDistance = distance(start, reversedStartDetails);
	const reversedEndDistance = distance(end, reversedEndDetails);

	// if the distance is greater than 1km, throw an error
	if (
		(startDistance > 0.1 || endDistance > 0.1) &&
		(reversedStartDistance > 0.1 || reversedEndDistance > 0.1)
	) {
		throw new Error("Marker is too far from the route");
	}

	// Get the coordinates based on the nearest point in the route from the marker
	const startIndex = startDetails.properties.featureIndex;
	const endIndex = endDetails.properties.featureIndex;

	let startPos;
	let endPos;

	// if location of end coordinate is before start in the array, then swap the values
	if (endIndex > startIndex) {
		startPos = startIndex;
		endPos = endIndex;
	} else {
		startPos = endIndex;
		endPos = startIndex;
	}

	let totalDistance = 0;

	// Add each distances between points in the arrayto get the total distance
	for (let i = startPos; i < endPos; i++) {
		const first = point([data[i].lng, data[i].lat]);
		const second = point([data[i + 1].lng, data[i + 1].lat]);
		const smallDistance = distance(first, second);
		totalDistance += smallDistance;
	}

	return totalDistance;
};

export const setMarkerSession = (markerType, coordinates) => {
	sessionStorage.setItem(
		markerType,
		JSON.stringify({
			lat: coordinates.lat,
			lng: coordinates.lng,
		})
	);
};

const getPUJDetails = (PUJType) => {
	switch (PUJType) {
		case "TRAD_PUJ":
			return fares.TRAD_PUJ;
		case "MOD_PUJ_AIR":
			return fares.MOD_PUJ_AIR;
		case "MOD_PUJ_NON_AIR":
			return fares.MOD_PUJ_NON_AIR;
		default:
			return fares.TRAD_PUJ;
	}
};

const getFareDetails = (fareType, PUJDetails) => {
	switch (fareType) {
		case "regular":
			return PUJDetails.regular;
		case "special":
			return PUJDetails.special;
		default:
			return PUJDetails.regular;
	}
};

export const getJeepRouteName = (divName) => {
	switch (divName) {
		case "first-route":
			return routes.LAPAZ_TO_CITY_PROPER_ROUTE.name;
		case "second-route":
			return routes.BITO_ON_TO_LAPAZ.name;
		case "third-route":
			return routes.UNGKA_TO_LAPAZ.name;
		case "fourth-route":
			return routes.LAPAZ_TO_FESTIVE.name;
		default:
			return routes.LAPAZ_TO_CITY_PROPER_ROUTE.name;
	}
};

// function to return the forward and backward route of the jeepney given the jeepney name
export const getJeepRouteNameByString = (jeepName) => {
	switch (jeepName) {
		case "first-route":
			return {
				forward: "Lapaz - Iloilo City Proper",
				backward: "Iloilo City Proper - Lapaz",
			};
		case "second-route":
			return {
				forward: "Bito-on - Lapaz",
				backward: "Lapaz - Bito-on",
			};
		case "third-route":
			return {
				forward: "Ungka - Lapaz",
				backward: "Lapaz - Ungka",
			};
		case "fourth-route":
			return {
				forward: "Lapaz - Festive Walk Transport Hub",
				backward: "Festive Walk Transport Hub - Lapaz",
			};
		default:
			return {
				forward: "Lapaz - Iloilo City Proper",
				backward: "Iloilo City Proper - Lapaz",
			};
	}
};

export const getJeepRoute = (divName) => {
	switch (divName) {
		case "first-route":
			return routes.LAPAZ_TO_CITY_PROPER_ROUTE;
		case "second-route":
			return routes.BITO_ON_TO_LAPAZ;
		case "third-route":
			return routes.UNGKA_TO_LAPAZ;
		case "fourth-route":
			return routes.LAPAZ_TO_FESTIVE;
		default:
			return routes.LAPAZ_TO_CITY_PROPER_ROUTE;
	}
};

export const getJeepRouteByString = (jeepName) => {
	switch (jeepName) {
		case "LA PAZ - ILOILO CITY PROPER VIA ISATU":
			return routes.LAPAZ_TO_CITY_PROPER_ROUTE;
		case "BITO-ON - LAPAZ VIA COASTAL LOOP":
			return routes.BITO_ON_TO_LAPAZ;
		case "UNGKA - LA PAZ VIA CPU - ISATU LOOP":
			return routes.UNGKA_TO_LAPAZ;
		case "LA PAZ - FESTIVE WALK TRANSPORT HUB VIA NABITASAN LOOP":
			return routes.LAPAZ_TO_FESTIVE;
		default:
			return routes.LAPAZ_TO_CITY_PROPER_ROUTE;
	}
};

export const getFare = (PUJType, fareType, distance) => {
	const PUJDetails = getPUJDetails(PUJType);
	const fareDetails = getFareDetails(fareType, PUJDetails);

	if (distance <= 4 && distance >= 1) {
		return fareDetails.start;
	}
	return (distance - 4) * fareDetails.increment + fareDetails.start;
};

export const coordObjToList = (obj) => {
	return [obj.lat, obj.lng];
};
