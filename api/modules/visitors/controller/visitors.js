const app				= require( 'event_request' )();
const visitorsModel		= require( '../model/visitors' );
const visitorsRouter	= app.Router();

visitorsRouter.get( '/unique', visitorsModel.getUniqueVisitors );

module.exports	= visitorsRouter;