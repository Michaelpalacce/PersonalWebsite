'use strict';

// Dependencies
const app			= require( 'event_request' )();
const ejs			= require( 'ejs' );
const path			= require( 'path' );

require( './mongoose/schemas' );

const errorHandler	= require( './error/error_handler' );
const logger		= require( './logging/logger' );
const PROJECT_ROOT	= path.parse( require.main.filename ).dir;

// Add environment variables to the process.env
app.apply( app.er_env );

// Attach a render function
app.add(( event )=>{
	event.render	= async ( templateName, variables = {} )=>{
		event.setResponseHeader( 'Content-Type', 'text/html' ).send( await event.getRenderedData( templateName, variables ) );
	};

	event.getRenderedData	= ( templateName, variables = {} )=>{
		return ejs.renderFile( path.join( PROJECT_ROOT, process.env.TEMPLATES_DIR, templateName ), variables );
	};

	event.on( 'cleanUp', ()=>{ event.render = undefined; event.getRenderedData = undefined; });
	event.next();
});

// Add Error Handler
app.add(( event )=>{
	event.errorHandler	= errorHandler;
	event.next();
});

// Attach the cache server
app.apply( app.er_data_server,				{ dataServerOptions: { persist: true } } );

app.apply( app.er_rate_limits, {rules:
	[
		{
			"path": "",
			"methods": [],
			"maxAmount": 1000,
			"refillTime": 1,
			"refillAmount": 200,
			"policy": "strict",
			"ipLimit": false
		}
	]
});

// Serve Static Resources
app.apply( app.er_static_resources,			{ paths	: ['favicon.ico', process.env.STATIC_RESOURCES] } );

// Add a logger
app.apply( app.er_logger,					{ logger } );

// Parse body
app.apply( app.er_body_parser_form );
app.apply( app.er_body_parser_json );
app.apply( app.er_body_parser_multipart,	{ tempDir	: path.join( PROJECT_ROOT, process.env.UPLOADS_DIR ) } );
app.apply( app.er_body_parser_raw );

app.apply( app.er_timeout,					{ timeout	: process.env.REQUEST_TIMEOUT } );
