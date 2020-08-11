
$( '.copyer' ).on( 'click', document, ( event ) => {
	const element	= event.target;
	const input		= document.createElement( 'input' );
	document.body.appendChild( input )
	input.value	= element.textContent

	input.select();
	document.execCommand( 'copy', false );

	input.remove();
	const color	= $( element ).attr( 'data-color' ) || 'white';

	$( element ).css( 'border-color', color );

	setTimeout(() => {
		$( element ).css( 'border-color', 'transparent' );
	}, 125 );
})