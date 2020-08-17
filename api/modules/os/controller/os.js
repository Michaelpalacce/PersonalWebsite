const app		= require( 'event_request' )();
const os		= require( 'os' );
const osUtils	= require( 'os-utils' );
const osRouter	= app.Router();

osRouter.get( '/freemem', event => event.send( os.freemem() ) );
osRouter.get( '/cpu', ( event ) => {
	osUtils.cpuUsage( async value => event.send( ( value * 100 ).toFixed( 2 ) ) );
});

module.exports	= osRouter;