const totalVisitorsKey	= 'totalVisitors';

module.exports			= {
	getUniqueVisitors	: async ( event ) => {
		event.send( await event.extra.metricsDataServer.get( totalVisitorsKey ) );
	}
};