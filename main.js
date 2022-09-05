import "./style.css";
import { routes } from "./src/constants";
import {
	createIloiloMap,
	setSessionStorage,
	setDOMValues,
	setDOMActions,
} from "./src/configs";

L.mapquest.key = import.meta.env.VITE_MQ_KEY;

setSessionStorage();
setDOMActions();
setDOMValues();

const directions = L.mapquest.directions();

directions.route(
	{
		waypoints: routes.BITO_ON_TO_LAPAZ.path,
	},
	createIloiloMap
);
