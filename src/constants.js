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
};

export const routes = {
	LAPAZ_TO_CITY_PROPER_ROUTE: [
		landmarks.BALDOZA_TERMINAL.coordinates,
		landmarks.LOPEZ_JAENA_ST.coordinates,
		landmarks.JEREOS_ST.coordinates,
		landmarks.JAVELLANA_EXT.coordinates,
		landmarks.COMMISSION_CIVIL_ST.coordinates,
		landmarks.BURGOS_ST.coordinates,
		landmarks.HUERVANA_ST.coordinates,
		landmarks.GEN_HUGHES_ST.coordinates,
	],
};
