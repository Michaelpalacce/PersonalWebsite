const app				= require( 'event_request' )();
const visitorsModel		= require( '../model/visitors' );
const visitorsRouter	= app.Router();

visitorsRouter.get( '/unique', visitorsModel.getUniqueVisitors );
visitorsRouter.get( '/path', visitorsModel.path );

module.exports	= visitorsRouter;