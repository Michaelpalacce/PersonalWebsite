const app			= require( 'event_request' )();
const adminRouter	= app.Router();

adminRouter.get( '/', async ( event ) => {
	await event.render( 'admin/main.ejs' );
});

module.exports	= adminRouter;