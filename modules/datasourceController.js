var $ = require('jquery'),
	eventController = require('./EventController');

function request(url, details) {
	return new Promise(function(resolve, reject) {
		$.ajax({url: url,
			 type: "GET",
			  headers: {"Origin": "*"},
		      success: function(data) {
		        resolve(data);
		      },
		      error: function(error) {
		        reject(error);
		      }
 		});
	})
	
}

// request games
/*request('http://127.0.0.1:8080/data/games.json').then(function(data) {
	eventController.emit('section-data-change',data);
});*/

var data = [
	{
		"title": "MyGame",
		"description": "DESC",
		"imageUrl": ""
	}
];
eventController.emit('section-data-change',data);