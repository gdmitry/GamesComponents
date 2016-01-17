var React = require('react'),
	eventController = require('../../modules/eventController'),
	GameTile = require('../game-tile/game-tile');

var GameSection = React.createClass({	 	
			render: function () {
				var games = this.props.section.games.map(function (game, index) {
					return ( <GameTile data = { game } key = { index }/>);
				});
				return ( <div className = "game-section" >
					<div className = "section-title" > {
						this.props.section.title
					} </div> <div className = "container" >					
						{games}
					</div> </div> );
				}
			});  

 module.exports = GameSection;