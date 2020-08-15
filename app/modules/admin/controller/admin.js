const app			= require( 'event_request' )();
const adminRouter	= app.Router();

adminRouter.add({
	route	: new RegExp( /.*/ ),
	handler	: async ( event ) => {
		if ( app.router.matchRoute( event.path, '/c3' ) || app.router.matchRoute( event.path, '/c3/login' ) )
			if ( event.session.get( 'authenticated' ) !== true )
				return event.next();
			else
				return event.redirect( '/c3/dashboard' );

		if ( event.session.get( 'authenticated' ) !== true )
			return event.redirect( '/c3' );

		event.next();
	}
});

adminRouter.get( '/', async ( event ) => {
	await event.render( 'admin/login.ejs' );
});

adminRouter.post(
	'/login',
	app.er_validation.validate( { body: { username : 'filled||string', password : 'filled||string' } }, event => event.redirect( '/c3' ) ),
	async ( event ) => {
		const { username, password }	= event.body;

		if ( username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD )
		{
			event.session.add( 'authenticated', true );
			return event.redirect( '/c3/dashboard' );
		}

		return event.redirect( '/c3' );
	}
);

adminRouter.get( '/logout', async ( event ) => {
	await event.session.removeSession();

	return event.redirect( '/c3' );
});

adminRouter.get( '/dashboard', ( event ) => {
	event.render( 'admin/dashboard.ejs', { authenticated: event.session.get( 'authenticated' ) } );
});

module.exports	= adminRouter;