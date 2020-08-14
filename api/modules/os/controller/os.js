const app		= require( 'event_request' )();
const os		= require( 'os' );
const osRouter	= app.Router();

osRouter.get( '/freemem', event => event.send( os.freemem() ) );

module.exports	= osRouter;