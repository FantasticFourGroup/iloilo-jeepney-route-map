import data from "./data.js";

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
