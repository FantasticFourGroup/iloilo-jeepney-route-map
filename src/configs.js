import { createMarker } from "./actions";
import { getRouteDistance, getFare, getJeepRouteName } from "./helpers";
import { routes } from "./constants";

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

export const setSessionStorage = () => {
	sessionStorage.setItem("jeepney", routes.LAPAZ_TO_CITY_PROPER_ROUTE.name);
};

export const setDOMActions = () => {
	const routeDivs = ["first-route", "second-route", "third-route"];

	routeDivs.forEach((routeDiv) => {
		document.getElementById(routeDiv).addEventListener("click", () => {
			const jeepneyType = getJeepRouteName(routeDiv);
			// sessionStorage.setItem("jeepney", jeepneyType);
			const jeepDiv = document.getElementById("jeep-type");
			jeepDiv.innerHTML = /*html*/ `
				<b class="jeep-type">Jeepney: </b>${jeepneyType}
			`;
		});
	});
};

export const setDOMValues = () => {
	const jeepneyType = sessionStorage.getItem("jeepney");
	document.getElementById("jeep-type").insertAdjacentHTML(
		"beforeend",
		/*html*/ `
			${jeepneyType}
		`
	);
};

export const createIloiloMap = (error, response) => {
	const mapLayer = L.mapquest.tileLayer("map");

	const map = L.mapquest.map("map", {
		center: [10.7202, 122.5621],
		layers: mapLayer,
		zoom: 14,
		zoomControl: false,
	});

	removeRouteMarkers(response).addTo(map);

	const startMarker = createMarker("start");
	const endMarker = createMarker("end");

	startMarker.addTo(map);
	endMarker.addTo(map);

	startMarker.on("moveend", (event) => {
		const coordinates = event.target._latlng;
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
		sessionStorage.setItem(
			"end",
			JSON.stringify({
				lat: coordinates.lat,
				lng: coordinates.lng,
			})
		);
	});

	document.getElementById("button").addEventListener("click", (event) => {
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

		document.getElementById("block").insertAdjacentHTML(
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
