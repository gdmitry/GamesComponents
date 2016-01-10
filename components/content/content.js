var React = require('react'),
	GameSection = require('../game-section/game-section.js'),
	GameDetails = require('../game-details/game-details.js'),
	eventController = require('../../modules/EventController');

var Content = React.createClass({		
	render: function () {
				return (<main className = "content">
							 <div className = "topbar"></div>
							 <GameSection title="Latest games"/>
							 <GameDetails/>
				 		</main> );
				}
			});

		module.exports = Content;