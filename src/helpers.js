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

export const getFare = (PUJType, fareType, distance) => {
	const PUJDetails = getPUJDetails(PUJType);
	const fareDetails = getFareDetails(fareType, PUJDetails);
	console.log(fareDetails, distance);
	if (distance <= 4 && distance >= 1) {
		return fareDetails.start;
	}
	return (distance - 4) * fareDetails.increment + fareDetails.start;
};
