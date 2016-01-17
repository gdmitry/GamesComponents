var datasourceModel = {},
    eventController = require('./EventController');

datasourceModel.games = [];
datasourceModel.sections = [];

function request(url) {
    return new Promise(
        function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            try {
                xhr.open('GET', url, true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('Accept', '*/*');
                xhr.onreadystatechange = function() {
                    if (this.readyState == 4) {                    	
                        //normal
                        if (this.status == 200 || (this.status === 0 && this.response)) {
                            resolve(this.response);
                        }
                        //clean
                        this.onreadystatechange = null;
                        xhr = undefined;
                    }
                };
                xhr.send();
            } catch (err) {
                console.log(err); //fail
                reject(err);
            }
        });
}

datasourceModel.loadData = function(url) {   
	return request(url).then(function(data) {
		try {
 			data = JSON.parse(data);
 			datasourceModel.sections = data; 			
		} catch(e) {
			console.error(e);
		}		        
    });   
}

datasourceModel.getGame = function(gameId) {
    var resultGame;
    datasourceModel.sections.some(function(section) {
    	return section.games.some(function(game) {
	        if (game.gameId === gameId) {
	            resultGame = game;
	            return true;
	        }
    	});    	
    });
	return resultGame;
}

datasourceModel.updateGame = function(gameId, details) {
     datasourceModel.sections.forEach(function(section) {
    	section.games.forEach(function(game) {
	        if (game.gameId === gameId) {
	           game.state = details.state;
	        }
    	});    	
    });
}

module.exports = datasourceModel;