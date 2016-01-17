
var datasourceModel = {},
eventController = require('./EventController');

datasourceModel.games = [];
datasourceModel.sections = [];

require('./data').getGamesData('/mocked.json')
.then(function(data) {
		datasourceModel.games=data[0].games; // only for one section		
		datasourceModel.sections = data;
	})
	.catch(function(data) {
		datasourceModel.games=data[0].games; // only for one section	
		datasourceModel.sections = data;
	});	

datasourceModel.getGame = function(gameId) {
	var resultGame;
	datasourceModel.games.some(function(game) {
		if (game.gameId === gameId) {
			resultGame = game;
			return true;
		}
	});
	return resultGame;
}

datasourceModel.updateGame = function(gameId, details) {
	var len = datasourceModel.games.length;
	var i, game;
	for (i = 0; i < len; i++) {
		game = datasourceModel.games[i];
		if (gameId === game.gameId) {
			game.state= details.state;			
		}
	}	
}



module.exports = datasourceModel;