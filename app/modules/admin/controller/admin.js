const app			= require( 'event_request' )();
const adminRouter	= app.Router();

adminRouter.add({
	route	: new RegExp( /.*/ ),
	handler	: async ( event ) => {
		if ( app.router.matchRoute( event.path, '/admin' ) || app.router.matchRoute( event.path, '/admin/login' ) )
			if ( event.session.get( 'authenticated' ) !== true )
				return event.next();
			else
				return event.redirect( '/admin/dashboard' );

		if ( event.session.get( 'authenticated' ) !== true )
			return event.redirect( '/admin' );

		event.next();
	}
});

adminRouter.get( '/', async ( event ) => {
	await event.render( 'admin/login.ejs' );
});

adminRouter.post(
	'/login',
	app.er_validation.validate( { body: { username : 'filled||string', password : 'filled||string' } }, event => event.redirect( '/admin' ) ),
	async ( event ) => {
		const { username, password }	= event.body;

		if ( username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD )
		{
			event.session.add( 'authenticated', true );
			return event.redirect( '/admin/dashboard' );
		}

		return event.redirect( '/admin' );
	}
);

adminRouter.get( '/logout', async ( event ) => {
	await event.session.removeSession();

	return event.redirect( '/admin' );
});

module.exports	= adminRouter;