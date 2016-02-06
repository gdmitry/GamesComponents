var datasourceModel = {};
	
datasourceModel.sections = [];
datasourceModel.games = {};

function request(url, headers) {
    return new Promise(
        function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            try {
                xhr.open('GET', url, true);
                xhr.timeout = 10000;
                for (var header in headers) {
                    xhr.setRequestHeader(header, headers[header]);
                }
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
            datasourceModel.sections = referenceModel(data);
            console.info(datasourceModel.games);
		} catch(e) {
			console.error(e);
		}		        
    });   
}

datasourceModel.getGame = function(gameId) {   
	return datasourceModel.games[gameId];
}

datasourceModel.updateGame = function(details) { 
    var game = datasourceModel.games[details.gameId];
    game.state = details.state;
}

function referenceModel(data) {   
    var index,
    gameId,
    gamesModel = datasourceModel.games;

    data.forEach(function(section) {
        index = 0;
        section.games.forEach(function(game) {  
            gameId = game.gameId;          
            if (!(gameId in gamesModel)) {
               gamesModel[gameId] = game;              
            }
            section.games[index] = gamesModel[gameId];
            index++;
        });     
    });  
    return data;
}

module.exports = datasourceModel;