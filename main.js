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

const setupEventButtons = () => {
	const leftButton = document.getElementById("left");
	const rightButton = document.getElementById("right");

	const formModal = document.getElementById("form-modal");
	const jeepForm = document.getElementById("jeep-form");

	leftButton.onclick = () => {
		if (jeepForm.style.display === "none") {
			jeepForm.style.display = "block";
		} else {
			jeepForm.style.display = "none";
		}
	};

	rightButton.onclick = () => {
		if (formModal.style.display === "none") {
			formModal.style.display = "block";
		} else {
			formModal.style.display = "none";
		}
	};
};

setupEventButtons();
