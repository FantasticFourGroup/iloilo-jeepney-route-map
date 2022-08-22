import "./style.css";

L.mapquest.key = import.meta.env.VITE_MQ_KEY;

const map = L.mapquest.map("map", {
	center: [10.7202, 122.5621],
	layers: L.mapquest.tileLayer("map"),
	zoom: 14,
});

map.addControl(L.mapquest.control());

L.mapquest.directions().route({
	start: "Baldoza Land Transport Terminal, Lapuz, Iloilo City, Iloilo",
	end: "Burgos St, Iloilo City Proper, Iloilo City, Iloilo",
	waypoints: [
		"Lopez Jaena St., La Paz, Iloilo City, Iloilo",
		"Jereos St., Iloilo City, Iloilo",
		"Javellana Ext. Rd, Jaro, Iloilo City, Iloilo",
		"Commission Civil St., Jaro, Iloilo City, Iloilo",
		"Burgos St., La Paz, Iloilo City, Iloilo",
		"Huervana St., La Paz, Iloilo City, Iloilo",
		"Rizal St., La Paz, Iloilo City, Iloilo",
		"Luna St., La Paz, Iloilo City, Iloilo",
		"Bonifacio Dr., Iloilo City Proper, Iloilo City, Iloilo",
		"Gen. Luna St., Iloilo City Proper, Iloilo City, Iloilo",
		"Jalandoni St., Iloilo City Proper, Iloilo City, Iloilo",
		"De Leon St., Iloilo City Proper, Iloilo City, Iloilo",
		"Fuentes St., Iloilo City Proper, Iloilo City, Iloilo",
		"Ledesma St., Iloilo City Proper, Iloilo City, Iloilo",
		"Iznart St., Iloilo City Proper, Iloilo City, Iloilo",
		"Rizal St., Iloilo City Proper, Iloilo City, Iloilo",
		"Gen. Hughes St., Iloilo City Proper, Iloilo City, Iloilo",
	],
});
