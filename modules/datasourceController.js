var datasourceModel = require('./datasourceModel.js'),
	dataPromise = datasourceModel.loadData('http://localhost:3000/sections');
    //dataPromise = datasourceModel.loadData('../data/data.json');

Core.listen('sections-data-request', function() {
	datasourceModel.loadData('http://localhost:3000/sections').then(function() {
		Core.emit('sections-data-change', datasourceModel.sections);       
	});   
});

Core.listen('game-info-request', function(event) {
    var gameId = event.detail.gameId;
    Core.emit('game-info-change', datasourceModel.getGame(gameId));
});

Core.listen('game-info-update', function(event) {
    var details = event.detail;
    datasourceModel.updateGame(details);  
    Core.emit('game-info-request', details);
    Core.emit('sections-data-request');     
});

// mock play state
Core.listen('game-info-update', function(event) {
    var details = event.detail;   
    if (details.state === 'loading') {
        setTimeout(function() {
        	details.state = "play";
            Core.emit('game-info-update', details);
        }, 3000);
    }   
});