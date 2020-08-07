const app			= require( 'event_request' )();
const homeRouter	= require( './home/controller/home' );
const adminRouter	= require( './admin/controller/admin' );

app.add( '/', homeRouter );
app.add( '/home', homeRouter );
app.add( '/admin', adminRouter );
