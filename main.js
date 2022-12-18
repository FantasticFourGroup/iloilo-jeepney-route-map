import "./style.css";
import { routes } from "./src/constants";
import { createIloiloMap, createReverseRoute } from "./src/configs";
import { getJeepRouteByString } from "./src/helpers";

// Mapquest api ke
L.mapquest.key = import.meta.env.VITE_MQ_KEY;

// Setup map layer
const mapLayer = L.mapquest.tileLayer("map");

const map = L.mapquest.map("map", {
	center: [10.7202, 122.5621],
	layers: mapLayer,
	zoom: 14,
	zoomControl: false,
});

// Get jeep route value from session
const storedJeep = sessionStorage.getItem("jeepney");
const forwardText = sessionStorage.getItem("forward");
const backwardText = sessionStorage.getItem("backward");

// Change current text of forward and backward route buttons
if (forwardText)
	document.getElementById("route1-toggle").innerHTML = forwardText;
if (backwardText)
	document.getElementById("route2-toggle").innerHTML = backwardText;

// Get jeep route type
const jeepObj =
	storedJeep === null
		? routes.LAPAZ_TO_CITY_PROPER_ROUTE
		: getJeepRouteByString(storedJeep);

const directions = L.mapquest.directions();

// Display reverse route if present
if ("reversePath" in jeepObj && "reverseColor" in jeepObj) {
	directions.route(
		{
			locations: jeepObj.reversePath,
		},
		createReverseRoute(map, jeepObj)
	);
}

// Display forward route
directions.route(
	{
		locations: jeepObj.path,
	},
	createIloiloMap(map, jeepObj)
);

// Setup toggle buttons for routes and modal cards
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
