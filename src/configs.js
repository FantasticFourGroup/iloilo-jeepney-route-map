import { createMarker } from "./actions";
import {
	getRouteDistance,
	getFare,
	getJeepRoute,
	setMarkerSession,
} from "./helpers";

const removeRouteMarkers = (response, route) => {
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
			color: route.color,
			opacity: 1.0,
			showTraffic: false,
		},
	});
};

export const setSessionStorage = (name) => {
	sessionStorage.clear();
	sessionStorage.setItem("jeepney", name);
	sessionStorage.setItem("disabled", false);
};

export const setDOMActions = (map, routeLayer, markerLayers) => {
	const routeDivs = ["first-route", "second-route", "third-route"];

	routeDivs.forEach((routeDiv) => {
		document.getElementById(routeDiv).addEventListener("click", (event) => {
			const disabled = sessionStorage.getItem("disabled");
			if (!JSON.parse(disabled)) {
				setTimeout(() => {
					sessionStorage.removeItem("disabled");
					sessionStorage.setItem("disabled", true);
					const jeepRoute = getJeepRoute(routeDiv);
					const jeepneyType = jeepRoute.name;
					sessionStorage.setItem("jeepney", jeepneyType);
					const storedType = sessionStorage.getItem("jeepney");
					const jeepDiv = document.getElementById("jeep-type");
					jeepDiv.innerHTML = /*html*/ `
							<b class="jeep-type">Jeepney: </b>${storedType}
						`;

					routeLayer.clearLayers();
					markerLayers.forEach((markerLayer) => {
						markerLayer.remove();
					});

					const directions = L.mapquest.directions();
					directions.route(
						{
							waypoints: jeepRoute.path,
						},
						createIloiloMap(map, jeepRoute)
					);
				}, 2000);
				sessionStorage.removeItem("disabled");
				sessionStorage.setItem("disabled", false);
			}
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
	const routeLayer = removeRouteMarkers(response, route);
	routeLayer.addTo(map);

	const startMarker = createMarker("start", response.route.locations);
	const endMarker = createMarker("end", response.route.locations);

	startMarker.addTo(map);
	endMarker.addTo(map);

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
	setDOMActions(map, routeLayer, [startMarker, endMarker]);

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

		document.getElementById("form-modal").insertAdjacentHTML(
			"beforeend",
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
