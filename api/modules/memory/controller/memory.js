const app			= require( 'event_request' )();
const memoryRouter	= app.Router();

/**
 * @brief	Retrieves different memory variables
 */
memoryRouter.get( '/heapTotal', event => event.send( process.memoryUsage().heapTotal ) );
memoryRouter.get( '/heapUsed', event => event.send( process.memoryUsage().heapUsed ) );
memoryRouter.get( '/external', event => event.send( process.memoryUsage().external ) );
memoryRouter.get( '/arrayBuffers', event => event.send( process.memoryUsage().arrayBuffers ) );
memoryRouter.get( '/rss', event => event.send( process.memoryUsage().rss ) );

module.exports	= memoryRouter;