const io		= require( '@pm2/io' );
const Router	= require( 'event_request/server/components/routing/router' );

/**
 * @brief	Provided a data server, returns the total unique visitors counter
 *
 * @param	{DataServer} dataServer
 *
 * @return	Object
 */
module.exports	= ( dataServer ) => {
	const PREFIX	= '$METRICS:PATHS:';

	const paths		= {
		'/'				: io.counter( { name: '/', id: 'app/realtime/hits/home' } ),
		'/Projects'		: io.counter( { name: '/Projects', id: 'app/realtime/hits/Projects' } ),
		'/Blog'			: io.counter( { name: '/Blog', id: 'app/realtime/hits/Blog' } ),
		'/About'		: io.counter( { name: '/About', id: 'app/realtime/hits/About' } ),
		'/Contacts'		: io.counter( { name: '/Contacts', id: 'app/realtime/hits/Contacts' } ),
		'/c3'			: io.counter( { name: '/c3', id: 'app/realtime/hits/c3' } ),
		'/admin'		: io.counter( { name: '/admin', id: 'app/realtime/hits/admin' } ),
	};

	const metric	= {};

	/**
	 * @brief	Fetches the total number of unique visitors
	 *
	 * @return	Promise
	 */
	metric.startUp	= async function()
	{
		for ( const path in paths )
		{
			const counter		= paths[path];
			const prefixedPath	= `${PREFIX}${path}`;

			if ( await dataServer.get( prefixedPath ) === null )
				await dataServer.set( prefixedPath, 0 )

			counter.inc( await dataServer.get( prefixedPath ) );
		}
	};

	/**
	 * @brief	Increments the total number of unique visitors if needed
	 *
	 * @param	{EventRequest} event
	 *
	 * @return	Promise
	 */
	metric.callback	= async function( event )
	{
		for ( const path in paths )
		{
			const counter	= paths[path];

			if ( Router.matchRoute( event.path, path ) )
			{
				await dataServer.increment( `${PREFIX}${path}` );
				counter.inc();
			}
		}
	};

	/**
	 * @brief	Gets the metric result
	 *
	 * @return	Promise
	 */
	metric.get		= async function ( path )
	{
		return await dataServer.get( `${PREFIX}${path}` );
	}

	return metric;
}