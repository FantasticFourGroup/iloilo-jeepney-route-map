import { createMarker } from "./actions";
import {
	getRouteDistance,
	getFare,
	getJeepRoute,
	setMarkerSession,
} from "./helpers";

const removeRouteMarkers = (response, route, color, opacity) => {
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
			color,
			opacity,
			showTraffic: false,
		},
	});
};

export const setSessionStorage = (name) => {
	const storedJeep = sessionStorage.getItem("jeepney");
	if (!storedJeep) {
		sessionStorage.clear();
		sessionStorage.setItem("jeepney", name);
	}
};

export const setDOMActions = (map, routeLayer, markerGroup) => {
	const routeDivs = [
		"first-route",
		"second-route",
		"third-route",
		"fourth-route",
	];

	routeDivs.forEach((routeDiv) => {
		document.getElementById(routeDiv).addEventListener("click", (event) => {
			const jeepRoute = getJeepRoute(routeDiv);
			const jeepneyType = jeepRoute.name;
			sessionStorage.setItem("jeepney", jeepneyType);

			window.location.reload();
		});
	});
};

export const setDOMValues = () => {
	const jeepneyType = sessionStorage.getItem("jeepney");
	const jeepNode = document.getElementById("jeep-type");
	jeepNode.removeChild(jeepNode.lastChild);
	jeepNode.insertAdjacentHTML(
		"beforeend",
		/*html*/ `
			${jeepneyType}
		`
	);
};

export const createIloiloMap = (map, route) => (error, response) => {
	setSessionStorage(route.name);

	const markerGroup = L.layerGroup().addTo(map);

	const routeLayer = removeRouteMarkers(response, route, route.color, 1.0);
	routeLayer.addTo(map);

	const startMarker = createMarker("start", response.route.locations);
	const endMarker = createMarker("end", response.route.locations);

	startMarker.addTo(markerGroup);
	endMarker.addTo(markerGroup);

	setMarkerSession("start", startMarker.getLatLng());
	setMarkerSession("end", endMarker.getLatLng());

	startMarker.on("moveend", (event) => {
		const coordinates = event.target._latlng;
		setMarkerSession("start", coordinates);
	});

	endMarker.on("moveend", (event) => {
		const coordinates = event.target._latlng;
		setMarkerSession("end", coordinates);
	});

	setDOMValues();
	setDOMActions(map, routeLayer, markerGroup);

	document.getElementById("go-button").addEventListener("click", (event) => {
		const start = JSON.parse(sessionStorage.getItem("start"));
		const end = JSON.parse(sessionStorage.getItem("end"));
		const { shapePoints } = response.route.shape;

		const startArray = [start.lng, start.lat];
		const endArray = [end.lng, end.lat];

		const totalDistance = getRouteDistance(startArray, endArray, shapePoints);
		const totalFare = getFare(
			"MOD_PUJ_AIR",
			"regular",
			Math.floor(totalDistance)
		);
		const jeepneyType = sessionStorage.getItem("jeepney");

		document.getElementById("go-button-container").insertAdjacentHTML(
			"beforebegin",
			/*html*/ `
				<div id="details">
					<div class="detail">
						<b class="distance">Distance: </b> ${Math.round(totalDistance * 100) / 100}
					</div>
					<div class="detail">
						<b class="fare">Fare: </b> ${totalFare}
					</div>
					<div class="detail" id="jeep-type">
						<b class="jeep-type">Jeepney: </b> ${jeepneyType}
					</div>
				</div>
			`
		);
	});
};

export const createReverseRoute = (map, route) => (error, response) => {
	const routeLayer = removeRouteMarkers(
		response,
		route,
		route.reverseColor,
		1.0
	);
	routeLayer.addTo(map);
};
