/**
 * @brief	Types out elements
 *
 * @param	{Element} element
 * @param	{String} text
 * @param	{Number} speed
 * @param	{Number} i
 *
 * @return	void
 */
function type( { element, text, speed, i } = {} )
{
	if ( i === 0 )
		element.text( '' );

	if ( i < text.length )
	{
		element.text( element.text() + text.charAt( i ) );
		i ++;

		setTimeout( () => { type( { element, text, speed, i } ); }, speed );
	}
}

$( '.typer' ).each(( index, element ) => {
	setTimeout(()=>{
		element		= $( element );
		const text	= element.text();
		const speed	= element.attr( 'data-type-speed' ) || 125;
		const i		= 0;

		type({
			element,
			text,
			speed,
			i
		});
	});
});