const app			= require( 'event_request' )();
const adminRouter	= require( './admin/controller/admin' );

app.get( '/', async ( event ) => {
	await event.render( 'index.ejs', { authenticated: event.session.get( 'authenticated' ) } );
});

app.get( '/Blog', async ( event ) => {
	await event.render( 'blog.ejs', { authenticated: event.session.get( 'authenticated' ) } );
});

app.get( '/About', async ( event ) => {
	await event.render( 'about_me.ejs', { authenticated: event.session.get( 'authenticated' ) } );
});

app.get( '/Projects', async ( event ) => {
	await event.render( 'projects.ejs', { authenticated: event.session.get( 'authenticated' ) } );
});

app.get( '/Contacts', async ( event ) => {
	await event.render( 'contacts.ejs', { authenticated: event.session.get( 'authenticated' ) } );
});

app.add( '/admin', adminRouter );

app.get( '/admin/dashboard', ( event ) => {
	event.render( 'admin/dashboard.ejs', { authenticated: event.session.get( 'authenticated' ) } );
});
