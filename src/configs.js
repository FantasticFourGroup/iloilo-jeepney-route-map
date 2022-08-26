export const createIloiloMap = (error, response) => {
	const mapLayer = L.mapquest.tileLayer("map");
	const icoEmpty = L.icon({ iconUrl: "a" });

	const map = L.mapquest.map("map", {
		center: [10.7202, 122.5621],
		layers: mapLayer,
		zoom: 14,
	});

	const DirectionsLayerWithEmptyMarkers = L.mapquest.DirectionsLayer.extend({
		createStartMarker: function (location, stopNumber) {
			return L.marker(location.latLng, {}).bindPopup("Start");
		},

		createWaypointMarker: function (location, stopNumber) {
			return L.marker(location.latLng, {}).bindPopup("Waypoint");
		},

		createEndMarker: function (location, stopNumber) {
			return L.marker(location.latLng, {}).bindPopup("End");
		},
		createStartMarker: function (location, stopNumber) {
			return L.marker(location.latLng, { icon: icoEmpty });
		},
		createWaypointMarker: function (location, stopNumber) {
			return L.marker(location.latLng, { icon: icoEmpty });
		},
		createEndMarker: function (location, stopNumber) {
			return L.marker(location.latLng, { icon: icoEmpty });
		},
	});

	const directionsLayer = new DirectionsLayerWithEmptyMarkers({
		directionsResponse: response,
	}).addTo(map);

	L.control
		.layers({
			Map: mapLayer,
		})
		.addTo(map);

	const drawnItems = L.featureGroup().addTo(map);

	map.addControl(
		new L.Control.Draw({
			edit: {
				featureGroup: drawnItems,
				poly: {
					allowIntersection: false,
				},
			},
			draw: {
				polygon: {
					allowIntersection: false,
					showArea: true,
				},
			},
		})
	);

	map.on(L.Draw.Event.CREATED, function (event) {
		var layer = event.layer;

		drawnItems.addLayer(layer);
	});
};
