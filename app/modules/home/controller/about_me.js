const app			= require( 'event_request' )();
const aboutMeRouter	= app.Router();

aboutMeRouter.get( '/', async ( event ) => {
	await event.render( 'about_me.ejs' );
});

module.exports	= aboutMeRouter;