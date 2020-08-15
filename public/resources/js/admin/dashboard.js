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

function convertToMb( number )
{
	return ( parseInt( number ) / 1024 / 1024 ).toFixed( 2 )
}

/**
 * @brief	Refreshes all stats
 *
 * @return	void
 */
async function refreshStats()
{
	$( '#unique-visitors-placeholder' ).text( await getData( '/api/v1/visitors/unique' ) );
	$( '#visitors-path-home' ).text( await getData( '/api/v1/visitors/path?path=%2F' ) );
	$( '#visitors-path-projects' ).text( await getData( '/api/v1/visitors/path?path=%2FProjects' ) );
	$( '#visitors-path-blog' ).text( await getData( '/api/v1/visitors/path?path=%2FBlog' ) );
	$( '#visitors-path-about' ).text( await getData( '/api/v1/visitors/path?path=%2FAbout' ) );
	$( '#visitors-path-contacts' ).text( await getData( '/api/v1/visitors/path?path=%2FContacts' ) );
	$( '#visitors-path-c3' ).text( await getData( '/api/v1/visitors/path?path=%2Fc3' ) );
	$( '#visitors-path-admin' ).text( await getData( '/api/v1/visitors/path?path=%2Fadmin' ) );
	$( '#heap-used-placeholder' ).text( `${convertToMb( await getData( '/api/v1/memory/heapUsed' ) )}MB` );
	$( '#heap-rss-placeholder' ).text( `${convertToMb( await getData( '/api/v1/memory/rss' ) )}MB` );
	$( '#os-freemem-placeholder' ).text( `${convertToMb( await getData( '/api/v1/os/freemem' ) )}MB` );
}

setInterval(() => {
	refreshStats();
}, 5000 );

refreshStats();