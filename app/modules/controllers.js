const app				= require( 'event_request' )();
const homeRouter		= require( './home/controller/home' );
const projectsRouter	= require( './home/controller/projects' );
const adminRouter		= require( './admin/controller/admin' );

app.add( '/', homeRouter );
app.add( '/Projects', projectsRouter );
app.add( '/admin', adminRouter );
