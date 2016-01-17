var $ = require('jquery'),
	datasourceModel = require('./gamesmodel'),
	eventController = require('./EventController');

eventController.listen('sections-data-request',function() {
	eventController.emit('sections-data-change', datasourceModel.sections);	
});


eventController.listen('game-info-request',function(event) {
	var gameId = event.detail.gameId;
	eventController.emit('game-info-change', datasourceModel.getGame(gameId));	
});

eventController.listen('game-state-change',function(event) {
	var details = event.detail;
	datasourceModel.updateGame(details.gameId, {state: details.state});
	if (details.state === 'loading') {
		setTimeout(function() {
			eventController.emit('game-state-change', {gameId: details.gameId, state: "play"});
		},3000);		
	}
	eventController.emit('game-info-request', {gameId: details.gameId});
});
