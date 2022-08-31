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

export const getMarkerDetails = (start, end, data) => {
	const transformedData = data.map((coord) => point([coord.lng, coord.lat]));
	const points = featureCollection(transformedData);
	const startDetails = nearestPoint(start, points);
	const endDetails = nearestPoint(end, points);
	const startIndex = startDetails.properties.featureIndex;
	const endIndex = endDetails.properties.featureIndex;

	const subPoints = transformedData.slice(startIndex, endIndex + 1);

	let totalDistance = 0;

	for (let i = startIndex; i < endIndex; i++) {
		const first = point([data[i].lng, data[i].lat]);
		const second = point([data[i + 1].lng, data[i + 1].lat]);
		const smallDistance = distance(first, second);
		totalDistance += smallDistance;
	}

	console.log(totalDistance);
	document.getElementById("block").insertAdjacentHTML(
		"afterbegin",
		/*html*/ `
		<b>Distance: </b>${totalDistance}
		<br><br>
	`
	);
};
