const path				= require( 'path' );
const crypto			= require( 'crypto' );
const os				= require( 'os' );
const io				= require( '@pm2/io' );
const app				= require( 'event_request' )();
const DataServerMap		= require( 'event_request/server/components/caching/data_server_map' );

const dataServer		= new DataServerMap( { ttl: -1, useBigMap: true, persistInterval: 1, persist: true, persistPath: path.join( os.tmpdir(), 'uniqueVisitors' ) } );
const uniqueVisitors	= io.counter( { name: 'Realtime unique visitors', id: 'app/realtime/unique-visitors' } );

app.add( async ( event ) => {
	const md5Sum	= crypto.createHash( 'md5' );
	md5Sum.update( event.clientIp );
	const result	= md5Sum.digest( 'utf8' );

	if ( await dataServer.get( result ) === null )
	{
		await dataServer.set( result, '0' );
		uniqueVisitors.inc();
	}

	event.next();
});
