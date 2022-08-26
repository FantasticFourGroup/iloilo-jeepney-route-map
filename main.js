import "./style.css";
import { landmarks, routes } from "./src/constants";
import { createIloiloMap } from "./src/configs";

L.mapquest.key = import.meta.env.VITE_MQ_KEY;

const directions = L.mapquest.directions();

directions.route(
	{
		locations: routes.LAPAZ_TO_CITY_PROPER_ROUTE,
	},
	createIloiloMap
);

directions.routeMatrix(
	{
		locations: routes.LAPAZ_TO_CITY_PROPER_ROUTE,
		options: {
			allToAll: true,
		},
	},
	(_, response) => console.log(response)
);
