const app				= require( 'event_request' )();
const homeRouter		= require( './home/controller/home' );
const projectsRouter	= require( './home/controller/projects' );
const blogRouter		= require( './home/controller/blog' );
const aboutMeRouter		= require( './home/controller/about_me' );
const contactsRouter	= require( './home/controller/contacts' );
const adminRouter		= require( './admin/controller/admin' );

app.add( '/', homeRouter );
app.add( '/Blog', blogRouter );
app.add( '/About', aboutMeRouter );
app.add( '/Projects', projectsRouter );
app.add( '/Contacts', contactsRouter );
app.add( '/admin', adminRouter );
