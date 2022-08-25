export const routesCallback = (map) => (error, response) => {
	console.log(response);
	L.mapquest
		.directionsLayer({
			directionsResponse: response,
		})
		.addTo(map);

	return map;
};
