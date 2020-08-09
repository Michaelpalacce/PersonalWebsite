const app			= require( 'event_request' )();
const blogRouter	= app.Router();

blogRouter.get( '/', async ( event ) => {
	await event.render( 'blog.ejs' );
});

module.exports	= blogRouter;