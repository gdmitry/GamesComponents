var React = require('react'),
	eventController = require('../../modules/eventController'),
	GameTile = require('../game-tile/game-tile');

var GameSection = React.createClass({			
	 		getInitialState: function() {
    			return {games: []};
  			},
  			componentDidMount: function () {  				
				eventController.listen('sections-data-change', this.updateContent);
				eventController.emit('sections-data-request');			
			},				
			updateContent: function(event) {
				var sections = event.detail,
					sectionNames = sections.map(function(section) {
					return section.title;
				});
				var sectionIndex = sectionNames.indexOf(this.props.route.title);
				if (sectionIndex > -1) {
					if (this.isMounted()) {
						this.setState({games: sections[sectionIndex].games});
					}
										
				};
			
			},
			render: function () {
				var games = this.state.games.map(function (game, index) {
					return ( <GameTile data = { game } key = { index }/>);
				});
				return ( <div className = "game-section" >
					<div className = "section-title" > {
						this.props.route.title
					} </div> <div className = "container" >					
						{games}
					</div> </div> );
				}
			});  

 module.exports = GameSection;