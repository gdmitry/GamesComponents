var $ = require('jquery'),
	eventController = require('./EventController');

function request(url, details) {
	return new Promise(function(resolve, reject) {
		$.ajax({url: url,
			 type: "GET",
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

var data = 
	[{
		"title": "Latest games",
		"description": "DESC",		
		"games":[
			{
				"id": "game1",
				"title": "Maya Gold",
				"imageUrl": "images/tile_small.jpg",
				"description": "DESC",
				"jackpot": "2000"
			},
			{
				"id": "game2",
				"title": "Maya Gold",
				"imageUrl": "images/tile_small.jpg",
				"description": "DESC"
			},
			{
				"id": "game3",
				"title": "Maya Gold",
				"imageUrl": "images/tile_small.jpg",
				"description": "DESC"
			},
			{
				"id": "game4",
				"title": "Maya Gold",
				"imageUrl": "images/tile_small.jpg",
				"description": "DESC"
			},
			{
				"id": "game5",
				"title": "Maya Gold",
				"imageUrl": "images/tile_small.jpg",
				"description": "DESC"
			},
			{
				"id": "game6",
				"title": "Maya Gold",
				"imageUrl": "images/tile_small.jpg",
				"description": "DESC"
			},
			{
				"id": "game7",
				"title": "Maya Gold",
				"imageUrl": "images/tile_small.jpg",
				"description": "DESC"
			}
		]
	}];

eventController.emit('sections-data-change', data);