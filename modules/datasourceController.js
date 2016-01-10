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
				"gameId": "id_Maya_Gold",
				"title": "Maya Gold",
				"imageUrl": "images/tile_small.jpg",
				"imageDetailUrl": "images/product_page.jpg",
				"gameUrl": "file:///E:/%D0%A4%D0%BB%D0%B5%D1%88%D0%BA%D0%B0/Tony-Ray-Gianna---Chica-Loca-The-Perez-Brothers-amp-Dj-PM-Remix-Radio-Edit-Novinka-Arpel_-2012--Camaya-klubnaya-muzyka-Dfm-tol_ko-u-nas-zahodi-k-nam-ht(muzofon.com).mp3",
				"description": "DESC",
				"jackpot": "2000"
			},
			{
				"gameId": "id_Kollectnet",
				"title": "Kollectnet",
				"imageUrl": "images/tile_small.jpg",
				"imageDetailUrl": "images/product_page.jpg",
				"description": "DESC"
			},
			{
				"gameId": "id_Deal_or_No_Deal",
				"title": "Deal or No Deal",
				"imageUrl": "images/tile_small.jpg",
				"imageDetailUrl": "images/product_page.jpg",
				"description": "DESC"
			},
			{
				"gameId": "id_Maya_Gold",
				"title": "Maya Gold",
				"imageUrl": "images/tile_small.jpg",
				"imageDetailUrl": "images/product_page.jpg",
				"description": "DESC"
			},
			{
				"gameId": "id_CSI",
				"title": "Crime Scene Investigation",
				"imageUrl": "images/tile_small.jpg",
				"imageDetailUrl": "images/product_page.jpg",
				"description": "DESC"
			},
			{
				"gameId": "id_Maya_Gold",
				"title": "Maya Gold",
				"imageUrl": "images/tile_small.jpg",
				"imageDetailUrl": "images/product_page.jpg",
				"description": "DESC"
			},
			{
				"gameId": "id_Maya_Gold",
				"title": "Maya Gold",
				"imageUrl": "images/tile_small.jpg",
				"imageDetailUrl": "images/product_page.jpg",
				"description": "DESC"
			}
		]
	}];

eventController.emit('sections-data-change', data);
eventController.emit('navigation-change', {url: 'showcase'});