const app			= require( 'event_request' )();
const homeRouter	= app.Router();

homeRouter.get( '/', async ( event ) => {
	await event.render( 'index.ejs' );
});

module.exports	= homeRouter;