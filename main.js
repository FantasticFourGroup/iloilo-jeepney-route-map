import "./style.css";
import { landmarks } from "./src/constants";

L.mapquest.key = import.meta.env.VITE_MQ_KEY;

const map = L.mapquest.map("map", {
	center: [10.7202, 122.5621],
	layers: L.mapquest.tileLayer("map"),
	zoom: 14,
});

map.addControl(L.mapquest.control());

const directions = L.mapquest.directions();

directions.route({
	start: landmarks.BALDOZA_TERMINAL.coordinates,
	end: landmarks.GEN_HUGHES_ST.coordinates,
	waypoints: [
		landmarks.LOPEZ_JAENA_ST.coordinates,
		landmarks.JEREOS_ST.coordinates,
		landmarks.JAVELLANA_EXT.coordinates,
		landmarks.COMMISSION_CIVIL_ST.coordinates,
		landmarks.BURGOS_ST.coordinates,
		landmarks.HUERVANA_ST.coordinates,
	],
});

directions.setLayerOptions({
	startMarker: {
		draggable: false,
	},
	endMarker: {
		draggable: false,
	},
	waypointMarker: {
		draggable: false,
	},
});
