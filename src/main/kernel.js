'use strict';

// Dependencies
const app			= require( 'event_request' )();
const ejs			= require( 'ejs' );
const path			= require( 'path' );

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
app.apply( app.er_data_server,	{ dataServerOptions: { persist: true } } );

app.apply( app.er_rate_limits,	{ rules:
	[
		{
			"path": "",
			"methods": [],
			"maxAmount": 2000,
			"refillTime": 5,
			"refillAmount": 2000,
			"policy": "strict"
		},
		{
			"path": "/c3/login",
			"methods": ['POST'],
			"maxAmount": 5,
			"refillTime": 60,
			"refillAmount": 1,
			"policy": "strict",
			'ipLimit': true
		}
	]
});

// Serve Static Resources
app.apply( app.er_static,		{ paths	: ['assets'] } );
app.apply( app.er_static,		{ paths	: ['public/resources/imgs'] } );
app.apply( app.er_static,		{ paths	: ['public/resources/js', 'public/resources/css'], cache: { cacheControl: 'public', expirationDirectives: { 'max-age': 120 } } } );

// Add a logger
app.apply( app.er_logger,		{ logger } );

app.apply( app.er_cors,			{ origin : 'https://stefangenov.site' } );

// app.apply( app.er_security,		{
// 	csp		: {
// 		directives	: {
// 			'script-src'	: ['https://stackpath.bootstrapcdn.com', 'https://code.jquery.com'],
// 			'style-src'		: ['https://stackpath.bootstrapcdn.com'],
// 			'img-src'		: ['data:'],
// 		}
// 	},
// 	hsts	: {
// 		includeSubDomains	: false,
// 		preload				: true,
// 	}
// });

// Parse body
app.apply( app.er_body_parser_form );
app.apply( app.er_body_parser_json );
app.apply( app.er_body_parser_raw );

app.apply( app.er_timeout,		{ timeout	: process.env.REQUEST_TIMEOUT } );

app.apply( app.er_session, { sessionKey: 'er_sid' } );

app.add( async ( event ) => {
	await event.initSession();
	event.next();
});
