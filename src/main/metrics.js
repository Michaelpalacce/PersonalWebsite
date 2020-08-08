const path				= require( 'path' );
const crypto			= require( 'crypto' );
const os				= require( 'os' );
const io				= require( '@pm2/io' );
const app				= require( 'event_request' )();
const DataServerMap		= require( 'event_request/server/components/caching/data_server_map' );

const dataServer		= new DataServerMap( { ttl: -1, useBigMap: true, persistInterval: 5, persist: true, persistPath: path.join( os.tmpdir(), 'uniqueVisitors' ) } );
const uniqueVisitors	= io.counter( { name: 'Realtime unique visitors', id: 'app/realtime/unique-visitors' } );
const totalVisitorsKey	= 'totalVisitors';

async function initMetrics()
{
	if ( await dataServer.get( totalVisitorsKey ) === null )
		await dataServer.set( totalVisitorsKey, 0 );

	uniqueVisitors.inc( await dataServer.get( totalVisitorsKey ) );
}

app.add( async ( event ) => {
	const md5Sum	= crypto.createHash( 'md5' );
	md5Sum.update( event.clientIp );
	const result	= md5Sum.digest( 'utf8' );

	if ( await dataServer.get( result ) === null )
	{
		await dataServer.set( result, '0' );
		await dataServer.increment( totalVisitorsKey, 1 );
		uniqueVisitors.inc();
	}

	event.next();
});

initMetrics();