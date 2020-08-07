const app		= require( 'event_request' )();
const mongoose	= require( 'mongoose' );

require( './src/main/kernel' );
require( './app/modules/controllers' );
require( './api/modules/controllers' );

mongoose.connect( 'mongodb://localhost/personalWebsite', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
	app.listen( 80, () => {
		app.Loggur.log( 'Server started', 200 );
	});
});
