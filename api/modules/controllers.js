const app				= require( 'event_request' )();
const visitorsRouter	= require( './visitors/controller/visitors' );
const memoryRouter		= require( './memory/controller/memory' );
const osRouter			= require( './os/controller/os' );

app.add({
	route	: new RegExp( /\/api.*/ ),
	handler	: ( event ) => {
		if ( event.session.get( 'authenticated' ) !== true )
			return event.sendError( 'app.security.unauthenticated' );

		event.next();
	}
});

app.add( '/api/v1/visitors', visitorsRouter );
app.add( '/api/v1/memory', memoryRouter );
app.add( '/api/v1/os', osRouter );
