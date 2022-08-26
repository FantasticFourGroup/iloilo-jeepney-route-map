const removeRouteMarkers = (map, response) => {
	const icoEmpty = L.icon({ iconUrl: "a" });

	const DirectionsLayerWithEmptyMarkers = L.mapquest.DirectionsLayer.extend({
		createStartMarker: (location, _) => {
			return L.marker(location.latLng, { icon: icoEmpty });
		},
		createWaypointMarker: (location, _) => {
			return L.marker(location.latLng, { icon: icoEmpty });
		},
		createEndMarker: (location, _) => {
			return L.marker(location.latLng, { icon: icoEmpty });
		},
	});

	new DirectionsLayerWithEmptyMarkers({
		directionsResponse: response,
	}).addTo(map);
};

export const createIloiloMap = (error, response) => {
	const mapLayer = L.mapquest.tileLayer("map");

	const map = L.mapquest.map("map", {
		center: [10.7202, 122.5621],
		layers: mapLayer,
		zoom: 14,
	});

	removeRouteMarkers(map, response);

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
