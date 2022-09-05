export const landmarks = {
	GEN_HUGHES_ST: {
		coordinates: [10.68845840453183, 122.57971679879475],
	},
	BALDOZA_TERMINAL: {
		coordinates: [10.71356947676554, 122.58209237413162],
	},
	LOPEZ_JAENA_ST: {
		coordinates: [10.713029304813393, 122.5738431842337],
	},
	JEREOS_ST: {
		coordinates: [10.716254635632342, 122.5688173387707],
	},
	JAVELLANA_EXT: {
		coordinates: [10.719894224424399, 122.56485498109788],
	},
	COMMISSION_CIVIL_ST: {
		coordinates: [10.718497530663202, 122.56390277246223],
	},
	BURGOS_ST: {
		coordinates: [10.714432220817578, 122.56760206575252],
	},
	HUERVANA_ST: {
		coordinates: [10.710002315221114, 122.56960431178891],
	},
	BONIFACIO_DR: {
		coordinates: [10.702416476345652, 122.56809373206555],
	},
	JALANDONI_ST: {
		coordinates: [10.700122796497132, 122.56176964774053],
	},
	DE_LEON_ST: {
		coordinates: [10.693262855485619, 122.56170007619939],
	},
	FUENTES_ST: {
		coordinates: [10.693841423048587, 122.56324286460115],
	},
	LEDESMA_ST: {
		coordinates: [10.694609757600812, 122.56336242925103],
	},
	JM_BASA_ST: {
		coordinates: [10.696164859708874, 122.56935465569131],
	},
	BITO_ON: {
		coordinates: [10.757649579489465, 122.5932535599162],
	},
	BURGOS_ST_V2: {
		coordinates: [10.71152824570325, 122.57179327389626],
	},
	BURGOS_ST_V3: {
		coordinates: [10.711671792640523, 122.5719776288044],
	},
};

export const routes = {
	LAPAZ_TO_CITY_PROPER_ROUTE: {
		name: "LA PAZ - ILOILO CITY PROPER VIA ISATU",
		path: [
			landmarks.BALDOZA_TERMINAL.coordinates,
			landmarks.LOPEZ_JAENA_ST.coordinates,
			landmarks.JEREOS_ST.coordinates,
			landmarks.JAVELLANA_EXT.coordinates,
			landmarks.COMMISSION_CIVIL_ST.coordinates,
			landmarks.BURGOS_ST.coordinates,
			landmarks.HUERVANA_ST.coordinates,
			landmarks.BONIFACIO_DR.coordinates,
			landmarks.JALANDONI_ST.coordinates,
			landmarks.DE_LEON_ST.coordinates,
			landmarks.FUENTES_ST.coordinates,
			landmarks.LEDESMA_ST.coordinates,
			landmarks.JM_BASA_ST.coordinates,
			landmarks.GEN_HUGHES_ST.coordinates,
		],
		color: "#E70000",
	},
	BITO_ON_TO_LAPAZ: {
		name: "BITO-ON - LAPAZ VIA COASTAL LOOP",
		path: [
			landmarks.BITO_ON.coordinates,
			landmarks.BURGOS_ST_V2.coordinates,
			landmarks.BURGOS_ST_V3.coordinates,
		],
		color: "#0066FF",
	},
	UNGKA_TO_LAPAZ: {
		name: "UNGKA - LA PAZ VIA CPU - ISATU LOOP",
		path: [],
	},
};

export const fares = {
	TRAD_PUJ: {
		regular: {
			start: 11.0,
			increment: 1.5,
		},
		special: {
			start: 8.75,
			increment: 1.2,
		},
		limit: 18,
	},
	MOD_PUJ_AIR: {
		regular: {
			start: 13.0,
			increment: 1.8,
		},
		special: {
			start: 10.5,
			increment: 1.44,
		},
		limit: 18,
	},
	MOD_PUJ_NON_AIR: {
		regular: {
			start: 13.0,
			increment: 1.5,
		},
		special: {
			start: 10.5,
			increment: 1.2,
		},
		limit: 18,
	},
};
