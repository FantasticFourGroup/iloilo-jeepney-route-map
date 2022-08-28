import { landmarks } from "./constants";

export const createMarker = (markerType) => {
	const color = markerType == "start" ? "#00FF00" : "#FF0000";
	const coordinates =
		markerType == "start"
			? L.latLng(landmarks.LOPEZ_JAENA_ST.coordinates)
			: L.latLng(landmarks.GEN_HUGHES_ST.coordinates);

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
