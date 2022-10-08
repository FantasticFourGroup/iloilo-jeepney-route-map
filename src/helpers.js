import { distance, point, featureCollection, nearestPoint } from "@turf/turf";

import { setupOnClick } from "./actions";
import { fares, routes } from "./constants";

export const getRouteDistance = (start, end, data) => {
	setupOnClick();

	// Transform the route points from an array data structure to an object
	const transformedData = data.map((coord) => point([coord.lng, coord.lat]));
	const points = featureCollection(transformedData);

	// Get the nearest points in the route based on the marker location
	const startDetails = nearestPoint(start, points);
	const endDetails = nearestPoint(end, points);

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
