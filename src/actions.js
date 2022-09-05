import { landmarks } from "./constants";
import { coordObjToList } from "./helpers";

export const createMarker = (markerType, locations) => {
	const color = markerType == "start" ? "#00FF00" : "#FF0000";
	const firstCoord = coordObjToList(locations[0].latLng);
	const lastCoord = coordObjToList(locations[locations.length - 1].latLng);
	const coordinates =
		markerType == "start" ? L.latLng(firstCoord) : L.latLng(lastCoord);

	sessionStorage.setItem(
		markerType,
		JSON.stringify({
			lat: coordinates.lat,
			lng: coordinates.lng,
		})
	);

	return L.mapquest.textMarker(coordinates, {
		type: "marker",
		draggable: true,
		icon: {
			primaryColor: "#333333",
			secondaryColor: color,
			size: "sm",
		},
	});
};

export const setupOnClick = () => {
	if (document.getElementById("details")) {
		document.getElementById("details").remove();
	}
};
