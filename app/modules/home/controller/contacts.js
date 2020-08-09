const app				= require( 'event_request' )();
const contactsRouter	= app.Router();

contactsRouter.get( '/', async ( event ) => {
	await event.render( 'contacts.ejs' );
});

module.exports	= contactsRouter;