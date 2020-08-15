/**
 * @brief	Used to retrieve data from the api
 *
 * @param	{String} url
 *
 * @return	Promise
 */
function getData( url )
{
	return new Promise(( resolve, reject ) => {
		$.ajax({
			url,
			method	: 'GET',
			success	: ( data ) => {
				resolve( data );
			},
			error	: reject
		});
	})
}

/**
 * @brief	Converts bytes to MB
 * @param	{Number} number
 *
 * @return	String
 */
function convertToMb( number )
{
	return `${( parseInt( number ) / 1024 / 1024 ).toFixed( 2 )}MB`
}

/**
 * @brief	Refreshes all stats
 *
 * @return	void
 */
async function refreshStats()
{
	const stats	= JSON.parse( await getData( '/api/v1/stats/all' ) );

	$( '#unique-visitors-placeholder' ).text( stats.uniqueVisitors );
	$( '#visitors-path-home' ).text( stats.homeVisitors );
	$( '#visitors-path-projects' ).text( stats.projectsVisitors );
	$( '#visitors-path-blog' ).text( stats.blogVisitors );
	$( '#visitors-path-about' ).text( stats.aboutVisitors );
	$( '#visitors-path-contacts' ).text( stats.contactsVisitors );
	$( '#visitors-path-c3' ).text( stats.c3Visitors );
	$( '#visitors-path-admin' ).text( stats.adminVisitors );
	$( '#heap-used-placeholder' ).text( convertToMb( stats.heapUsed ) );
	$( '#heap-rss-placeholder' ).text( convertToMb( stats.rss ) );
	$( '#os-freemem-placeholder' ).text( convertToMb( stats.freemem ) );
}

setInterval(() => {
	refreshStats();
}, 5000 );

refreshStats();
