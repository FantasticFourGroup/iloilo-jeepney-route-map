import "./style.css";
import { landmarks, routes } from "./src/constants";
import { createIloiloMap } from "./src/configs";

L.mapquest.key = import.meta.env.VITE_MQ_KEY;

const directions = L.mapquest.directions();

directions.route(
	{
		locations: [
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
	createIloiloMap
);

directions.setLayerOptions({
	waypointMarker: {
		draggable: false,
	},
});

directions.routeMatrix(
	{
		locations: routes.LAPAZ_TO_CITY_PROPER_ROUTE,
		options: {
			allToAll: true,
		},
	},
	(_, response) => console.log(response)
);
