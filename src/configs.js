import { createMarker } from "./actions";

const removeRouteMarkers = (response, map) => {
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

	new DirectionsLayerWithEmptyMarkers({
		directionsResponse: response,
		routeRibbon: {
			color: "#18BE00",
			opacity: 1.0,
			showTraffic: false,
		},
	}).addTo(map);
};

export const createIloiloMap = (error, response) => {
	const mapLayer = L.mapquest.tileLayer("map");

	const map = L.mapquest.map("map", {
		center: [10.7202, 122.5621],
		layers: mapLayer,
		zoom: 14,
	});

	removeRouteMarkers(response, map);

	const startMarker = createMarker("start");
	const endMarker = createMarker("end");

	startMarker.addTo(map);
	endMarker.addTo(map);

	map.on("click", function (event) {
		let coordinates = [];
		const marker = event.target;
		for (let prop in marker._layers) {
			if (!marker._layers.hasOwnProperty(prop)) continue;

			if (marker._layers[prop].hasOwnProperty("_iconContainer")) {
				let latLong = marker._layers[prop]._latlng;
				coordinates.push(latLong);
			}
		}
		document.getElementById("coordinates").innerText = `${coordinates}`;
	});
};
