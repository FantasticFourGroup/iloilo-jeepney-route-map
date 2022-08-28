import "./style.css";
import { landmarks, routes } from "./src/constants";
import { createIloiloMap } from "./src/configs";

L.mapquest.key = import.meta.env.VITE_MQ_KEY;

const directions = L.mapquest.directions();

directions.route(
	{
		waypoints: routes.LAPAZ_TO_CITY_PROPER_ROUTE,
	},
	createIloiloMap
);
