const app			= require( 'event_request' )();
const os			= require( 'os' );
const statsRouter	= app.Router();

/**
 * @brief	Retrieves stats used by the admin dashboard
 */
statsRouter.get( '/all', async ( event ) => {
	event.send({
		uniqueVisitors		: await event.extra.metrics.uniqueVisitors.get(),
		homeVisitors		: await event.extra.metrics.paths.get( '/' ),
		projectsVisitors	: await event.extra.metrics.paths.get( '/Projects' ),
		blogVisitors		: await event.extra.metrics.paths.get( '/Blog' ),
		aboutVisitors		: await event.extra.metrics.paths.get( '/About' ),
		contactsVisitors	: await event.extra.metrics.paths.get( '/Contacts' ),
		c3Visitors			: await event.extra.metrics.paths.get( '/c3' ),
		adminVisitors		: await event.extra.metrics.paths.get( '/admin' ),
		heapUsed			: process.memoryUsage().heapUsed,
		rss					: process.memoryUsage().rss,
		freemem				: os.freemem()
	});
});

module.exports	= statsRouter;