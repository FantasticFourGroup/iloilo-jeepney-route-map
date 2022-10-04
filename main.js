import "./style.css";
import { routes } from "./src/constants";
import { createIloiloMap, createReverseRoute } from "./src/configs";
import { getJeepRouteByString } from "./src/helpers";

L.mapquest.key = import.meta.env.VITE_MQ_KEY;

const mapLayer = L.mapquest.tileLayer("map");

const map = L.mapquest.map("map", {
	center: [10.7202, 122.5621],
	layers: mapLayer,
	zoom: 14,
	zoomControl: false,
});

const storedJeep = sessionStorage.getItem("jeepney");

const jeepObj =
	storedJeep === null
		? routes.LAPAZ_TO_CITY_PROPER_ROUTE
		: getJeepRouteByString(storedJeep);

const directions = L.mapquest.directions();

if ("reversePath" in jeepObj && "reverseColor" in jeepObj) {
	directions.route(
		{
			waypoints: jeepObj.reversePath,
		},
		createReverseRoute(map, jeepObj)
	);
}

directions.route(
	{
		waypoints: jeepObj.path,
	},
	createIloiloMap(map, jeepObj)
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

	const route1Toggle = document.getElementById("route1-toggle");
	const route2Toggle = document.getElementById("route2-toggle");
	const paths = document.getElementsByTagName("path");

	route1Toggle.onclick = () => {
		if (paths?.[0]) {
			const pathState = sessionStorage.getItem("route1");
			if (pathState == "visible") {
				sessionStorage.setItem("route1", "hidden");
				paths[0].style.opacity = 0;
			} else if (pathState == "hidden") {
				sessionStorage.setItem("route1", "visible");
				paths[0].style.opacity = 1;
			}
		}
	};

	route2Toggle.onclick = () => {
		if (paths?.[1]) {
			const pathState = sessionStorage.getItem("route1");
			if (pathState == "visible") {
				sessionStorage.setItem("route1", "hidden");
				paths[1].style.opacity = 0;
			} else if (pathState == "hidden") {
				sessionStorage.setItem("route1", "visible");
				paths[1].style.opacity = 1;
			}
		}
	};
};

setupEventButtons();
