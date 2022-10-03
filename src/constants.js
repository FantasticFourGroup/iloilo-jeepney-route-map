export const landmarks = {
	GEN_HUGHES_ST: {
		coordinates: [10.68845840453183, 122.57971679879475],
	},
	GEN_HUGHES_ST_V2: {
		coordinates: [10.69184983899303, 122.57384107770928],
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
	HUERVANA_EXT: {
		coordinates: [10.712793458578387, 122.56870764822739],
	},
	HUERVANA_ST: {
		coordinates: [10.710002315221114, 122.56960431178891],
	},
	HUERVANA_ST_V2: {
		coordinates: [10.708369058932227, 122.56780380464207],
	},
	BONIFACIO_DR: {
		coordinates: [10.702416476345652, 122.56809373206555],
	},
	BONIFACIO_DR_V2: {
		coordinates: [10.704237448550401, 122.56800037544564],
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
	JM_BASA_ST_V2: {
		coordinates: [10.69255911510122, 122.57318114588281],
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
	BURGOS_ST_V4: {
		coordinates: [10.711362132614193, 122.57157587060006],
	},
	BURGOS_ST_V5: {
		coordinates: [10.710479571790001, 122.57037990367189],
	},
	BURGOS_ST_V6: {
		coordinates: [10.713539956451909, 122.56814122241306],
	},
	UNGKA_TERMINAL: {
		coordinates: [10.75293276136994, 122.53846748716742],
	},
	DIVERSION_RD: {
		coordinates: [10.742016624554353, 122.53958303566986],
	},
	RIZAL_ST: {
		coordinates: [10.724007188092342, 122.55693279320172],
	},
	FESTIVE_WALK: {
		coordinates: [10.717300878818817, 122.54710578867638],
	},
	ARROYO_ST: {
		coordinates: [10.709824798042911, 122.5668699544163],
	},
	HECHANOVA_ST: {
		coordinates: [10.705541054619077, 122.56328157061957],
	},
	HECHANOVA_ST_V2: {
		coordinates: [10.703055553569909, 122.5570609368937],
	},
	ILOILO_RIVER_BLVD: {
		coordinates: [10.704360122525255, 122.55519393420805],
	},
	SERVICE_RD: {
		coordinates: [10.706726166911325, 122.55244762997886],
	},
	PISON_AVE: {
		coordinates: [10.70404002104515, 122.54407557662977],
	},
	MAGDALO_ST: {
		coordinates: [10.7118576021349, 122.56754237724371],
	},
	AIRPORT_RD: {
		coordinates: [10.724880408406163, 122.54952923226504],
	},
	JALANDONI_BRD: {
		coordinates: [10.702138011706019, 122.56095658562147],
	},
	LUNA_ST: {
		coordinates: [10.709059515621806, 122.56674863887783],
	},
	IZNART_ST: {
		coordinates: [10.701035137294959, 122.56909625908094],
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
		reversePath: [
			landmarks.GEN_HUGHES_ST.coordinates,
			landmarks.IZNART_ST.coordinates,
			landmarks.BONIFACIO_DR_V2.coordinates,
			landmarks.BALDOZA_TERMINAL.coordinates,
		],
		color: "#E70000",
		reverseColor: "#FFFF00",
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
		path: [
			landmarks.UNGKA_TERMINAL.coordinates,
			landmarks.BURGOS_ST_V5.coordinates,
		],
		reversePath: [
			landmarks.BURGOS_ST_V5.coordinates,
			landmarks.HUERVANA_ST_V2.coordinates,
			landmarks.BURGOS_ST_V6.coordinates,
			landmarks.UNGKA_TERMINAL.coordinates,
		],
		color: "#EBFF00",
		reverseColor: "#E70000",
	},
	LAPAZ_TO_FESTIVE: {
		name: "LA PAZ - FESTIVE WALK TRANSPORT HUB VIA NABITASAN LOOP",
		path: [
			landmarks.BURGOS_ST_V3.coordinates,
			landmarks.HUERVANA_EXT.coordinates,
			landmarks.MAGDALO_ST.coordinates,
			landmarks.ARROYO_ST.coordinates,
			landmarks.HECHANOVA_ST.coordinates,
			landmarks.SERVICE_RD.coordinates,
			landmarks.PISON_AVE.coordinates,
			landmarks.FESTIVE_WALK.coordinates,
		],
		reversePath: [
			landmarks.FESTIVE_WALK.coordinates,
			landmarks.AIRPORT_RD.coordinates,
			landmarks.SERVICE_RD.coordinates,
			landmarks.JALANDONI_BRD.coordinates,
			landmarks.LUNA_ST.coordinates,
			landmarks.BURGOS_ST_V3.coordinates,
		],
		color: "#0dc135",
		reverseColor: "#0066FF",
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
