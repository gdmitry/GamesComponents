var datasourceModel = require('./datasourceModel.js'),
    eventController = require('./EventController');

var dataPromise = datasourceModel.loadData('../data/data.json');

eventController.listen('sections-data-request', function() {
	dataPromise.then(function() {
		eventController.emit('sections-data-change', datasourceModel.sections);
	});   
});

eventController.listen('game-info-request', function(event) {
    var gameId = event.detail.gameId;
    eventController.emit('game-info-change', datasourceModel.getGame(gameId));
});

eventController.listen('game-info-update', function(event) {
    var details = event.detail;
    datasourceModel.updateGame(details.gameId, {
        state: details.state
    });
    if (details.state === 'loading') {
        setTimeout(function() {
            eventController.emit('game-info-update', {
                gameId: details.gameId,
                state: "play"
            });
        }, 3000);
    }
    eventController.emit('game-info-request', {
        gameId: details.gameId
    });
});