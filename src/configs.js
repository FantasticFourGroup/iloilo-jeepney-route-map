import { createMarker } from "./actions";
import { routes } from "./constants";
import { getMarkerDetails } from "./helpers";

const removeRouteMarkers = (response) => {
	const icoEmpty = L.icon({ iconUrl: "a" });

	const DirectionsLayerWithEmptyMarkers = L.mapquest.DirectionsLayer.extend({
		createStartMarker: (location, _) => {
			return L.marker(location.latLng, { icon: icoEmpty });
		},
		createEndMarker: (location, _) => {
			return L.marker(location.latLng, { icon: icoEmpty });
		},
		createWaypointMarker: (location, _) => {
			return L.marker(location.latLng, { icon: icoEmpty });
		},
	});

	return new DirectionsLayerWithEmptyMarkers({
		directionsResponse: response,
		routeRibbon: {
			color: "#18BE00",
			opacity: 1.0,
			showTraffic: false,
		},
	});
};

export const createIloiloMap = (error, response) => {
	const mapLayer = L.mapquest.tileLayer("map");

	const map = L.mapquest.map("map", {
		center: [10.7202, 122.5621],
		layers: mapLayer,
		zoom: 14,
	});

	removeRouteMarkers(response).addTo(map);

	const startMarker = createMarker("start");
	const endMarker = createMarker("end");

	startMarker.addTo(map);
	endMarker.addTo(map);

	startMarker.on("moveend", (event) => {
		const coordinates = event.target._latlng;
		document.getElementById("start-coordinate").innerText = `${coordinates}`;
		sessionStorage.setItem(
			"start",
			JSON.stringify({
				lat: coordinates.lat,
				lng: coordinates.lng,
			})
		);
	});

	endMarker.on("moveend", (event) => {
		const coordinates = event.target._latlng;
		document.getElementById("end-coordinate").innerText = `${coordinates}`;
		sessionStorage.setItem(
			"end",
			JSON.stringify({
				lat: coordinates.lat,
				lng: coordinates.lng,
			})
		);
	});

	document.getElementById("button").addEventListener("click", (event) => {
		// const { shapePoints } = response.route.shape;
		// console.log(response.route);
		// console.log(response.route.shape);

		const start = JSON.parse(sessionStorage.getItem("start"));
		const end = JSON.parse(sessionStorage.getItem("end"));

		const startArray = [start.lng, start.lat];
		const endArray = [end.lng, end.lat];

		getMarkerDetails(startArray, endArray);
	});

	console.log(response);
};
