import "./style.css";
import { landmarks } from "./src/constants";

L.mapquest.key = import.meta.env.VITE_MQ_KEY;

const directions = L.mapquest.directions();

const routesCallback = (error, response) => {
	const map = L.mapquest.map("map", {
		center: [10.7202, 122.5621],
		layers: L.mapquest.tileLayer("map"),
		zoom: 14,
	});

	console.log(response);

	map.addControl(L.mapquest.control());

	L.mapquest
		.directionsLayer({
			waypointMarker: {
				draggable: false,
			},
			directionsResponse: response,
		})
		.addTo(map);
	return map;
};

directions.route(
	{
		waypoints: [
			landmarks.BALDOZA_TERMINAL.coordinates,
			landmarks.LOPEZ_JAENA_ST.coordinates,
			landmarks.JEREOS_ST.coordinates,
			landmarks.JAVELLANA_EXT.coordinates,
			landmarks.COMMISSION_CIVIL_ST.coordinates,
			landmarks.BURGOS_ST.coordinates,
			landmarks.HUERVANA_ST.coordinates,
			landmarks.GEN_HUGHES_ST.coordinates,
		],
	},
	routesCallback
);
