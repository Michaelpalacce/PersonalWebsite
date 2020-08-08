const app				= require( 'event_request' )();
const projectsRouter	= app.Router();

projectsRouter.get( '/', async ( event ) => {
	await event.render( 'projects.ejs' );
});

module.exports	= projectsRouter;