import "./style.css";
import { routes } from "./src/constants";
import { createIloiloMap } from "./src/configs";

L.mapquest.key = import.meta.env.VITE_MQ_KEY;

const mapLayer = L.mapquest.tileLayer("map");

const map = L.mapquest.map("map", {
	center: [10.7202, 122.5621],
	layers: mapLayer,
	zoom: 14,
	zoomControl: false,
});

const directions = L.mapquest.directions();

directions.route(
	{
		waypoints: routes.LAPAZ_TO_CITY_PROPER_ROUTE.path,
	},
	createIloiloMap(map, routes.LAPAZ_TO_CITY_PROPER_ROUTE)
);
