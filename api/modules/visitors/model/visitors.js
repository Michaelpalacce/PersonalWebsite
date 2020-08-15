const totalVisitorsKey	= 'totalVisitors';

module.exports			= {
	/**
	 * @brief	Retrieves the Unique visitors
	 */
	getUniqueVisitors	: async ( event ) => {
		event.send( await event.extra.metrics.uniqueVisitors.get() );
	},
	/**
	 * @brief	Gets the clicks per path
	 */
	path				: async ( event ) => {
		const result	= await event.extra.metrics.paths.get( event.query.path );
		event.send( result === null ? 0 : result );
	},
};