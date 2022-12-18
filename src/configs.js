import { createMarker } from "./actions";
import {
	getRouteDistance,
	getFare,
	getJeepRoute,
	setMarkerSession,
	getJeepRouteNameByString,
} from "./helpers";

// Function that creates a custom route with no waypoint markers
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

// Sets initial values for persistent variables which appears even after refresh
export const setSessionStorage = (name) => {
	const storedJeep = sessionStorage.getItem("jeepney");
	if (!storedJeep) {
		sessionStorage.clear();
		sessionStorage.setItem("jeepney", name);
	}

	sessionStorage.setItem("fareType", "regular");
	sessionStorage.setItem("route1", "visible");
	sessionStorage.setItem("route2", "visible");
	sessionStorage.setItem("forward", "Lapaz - Iloilo City Proper");
	sessionStorage.setItem("backward", "Iloilo City Proper - Lapaz");
};

// Sets button onclicks like the choosing jeep routes and fare types
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
			const routeName = getJeepRouteNameByString(routeDiv);
			sessionStorage.setItem("jeepney", jeepneyType);
			sessionStorage.setItem("forward", routeName.forward);
			sessionStorage.setItem("backward", routeName.backward);

			window.location.reload();
		});
	});

	const fareSwitch = document.getElementById("switch");
	fareSwitch.addEventListener("change", (event) => {
		if (event.target.checked) {
			sessionStorage.setItem("fareType", "special");
		} else {
			sessionStorage.setItem("fareType", "regular");
		}
	});
};

// Sets the jeep type from session
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

// Function that creates the forward map specific to Iloilo
export const createIloiloMap = (map, route) => (error, response) => {
	setSessionStorage(route.name);

	const markerGroup = L.layerGroup().addTo(map);

	// Remove current routes when a new map is created
	const routeLayer = removeRouteMarkers(response, route, route.color, 1.0);
	routeLayer.addTo(map);

	// Create the start and end markers
	const startMarker = createMarker("start", response.route.locations);
	const endMarker = createMarker("end", response.route.locations);

	startMarker.addTo(markerGroup);
	endMarker.addTo(markerGroup);

	// Save the coordinates of the start and end markers to session
	setMarkerSession("start", startMarker.getLatLng());
	setMarkerSession("end", endMarker.getLatLng());

	// Setup movement for start and end marker
	startMarker.on("moveend", (event) => {
		const coordinates = event.target._latlng;
		setMarkerSession("start", coordinates);
	});

	endMarker.on("moveend", (event) => {
		const coordinates = event.target._latlng;
		setMarkerSession("end", coordinates);
	});

	// Set ups the jeep route buttons options
	setDOMValues();
	setDOMActions(map, routeLayer, markerGroup);

	// Action when pressing the "go button"
	document.getElementById("go-button").addEventListener("click", (event) => {
		try {
			const start = JSON.parse(sessionStorage.getItem("start"));
			const end = JSON.parse(sessionStorage.getItem("end"));
			const { shapePoints } = response.route.shape;

			const startArray = [start.lng, start.lat];
			const endArray = [end.lng, end.lat];

			// Calculate the total fare and save the jeep type to session
			const totalDistance = getRouteDistance(startArray, endArray, shapePoints);
			const fareType = sessionStorage.getItem("fareType");
			const totalFare = getFare(
				"TRAD_PUJ",
				fareType,
				Math.floor(totalDistance)
			);
			const jeepneyType = sessionStorage.getItem("jeepney");

			// Setup the values for distance, fare, and jeep type
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
		} catch (error) {
			if (error.message === "Marker is too far from the route") {
				alert("Marker is too far from the route");
			}
		}
	});
};

// Create reverse route
export const createReverseRoute = (map, route) => (error, response) => {
	const routeLayer = removeRouteMarkers(
		response,
		route,
		route.reverseColor,
		1.0
	);
	routeLayer.addTo(map);
};
