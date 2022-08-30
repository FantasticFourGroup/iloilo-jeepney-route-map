import data from "./data.js";
import { distance, point, featureCollection, nearestPoint } from "@turf/turf";

export const downloadFile = (obj) => {
	const data =
		"text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

	const a = document.createElement("a");
	a.href = "data:" + data;
	a.download = "data.json";
	a.innerHTML = "download JSON";

	const container = document.getElementById("formBlock");
	container.appendChild(a);
};

export const getMarkerDetails = (start, end) => {
	const transformedData = data.map((coord) => point([coord.lng, coord.lat]));
	const points = featureCollection(transformedData);
	const startDetails = nearestPoint(start, points);
	const endDetails = nearestPoint(end, points);
	const startIndex = startDetails.properties.featureIndex;
	const endIndex = endDetails.properties.featureIndex;

	const subPoints = transformedData.slice(startIndex, endIndex + 1);

	const directions = L.mapquest.directions();
	directions.route(
		{
			waypoints: subPoints,
		},
		(error, response) => {
			console.log(response);
		}
	);
};
