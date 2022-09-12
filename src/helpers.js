import { distance, point, featureCollection, nearestPoint } from "@turf/turf";

import { setupOnClick } from "./actions";
import { fares, routes } from "./constants";

export const getRouteDistance = (start, end, data) => {
	setupOnClick();
	const transformedData = data.map((coord) => point([coord.lng, coord.lat]));
	const points = featureCollection(transformedData);
	const startDetails = nearestPoint(start, points);
	const endDetails = nearestPoint(end, points);
	const startIndex = startDetails.properties.featureIndex;
	const endIndex = endDetails.properties.featureIndex;

	let totalDistance = 0;

	for (let i = startIndex; i < endIndex; i++) {
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
