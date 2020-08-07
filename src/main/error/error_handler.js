'use strict';

//Dependencies
const ErrorHandler	= require( 'event_request/server/components/error/error_handler' );
const errorHandler	= new ErrorHandler();

errorHandler.addNamespace( 'app', { formatter: async ( { event, code, status, message } ) => {
		return await event.getRenderedData(
			'error',
			{ code: status || 500, error: message || code || ErrorHandler.GENERAL_ERROR_CODE }
		).catch(() => {
			return errorHandler.defaultNamespace.formatter( { code, message } );
		});
	}}
);

module.exports	= errorHandler;
