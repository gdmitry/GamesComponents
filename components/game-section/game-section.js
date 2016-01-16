var React = require('react'),
	eventController = require('../../modules/EventController'),
	GameTile = require('../game-tile/game-tile');

var GameSection = React.createClass({
	 		getInitialState: function() {
    			return {games: []};
  			},
  			componentDidMount: function () {  		
  				var element = this.getDOMNode();
  				element.classList.add('hidden');		
				eventController.listen('sections-data-change', this.updateContent);			
				eventController.listen('navigation-change', this.changeLayout);
			},
			changeLayout: function (event) {  		
		 		var details = event.detail;
		 		var element = this.getDOMNode();		 		
		 		element.classList[details.url === 'showcase' ? 'remove' : 'add']('hidden');
		 		if (details.url === 'showcase') {
		 			window.location.hash = 'showcase';
		 		}		 		
			},	
			updateContent: function(event) {
				var sections = event.detail,
					sectionNames = sections.map(function(section) {
					return section.title;
				});
				var sectionIndex = sectionNames.indexOf(this.props.title);
				if (sectionIndex > -1) {
					this.setState({games: sections[sectionIndex].games});
				};
			},
			render: function () {
				var games = this.state.games.map(function (game, index) {
					return ( <GameTile data = { game } key = { index }/>);
				});
				return ( <div className = "game-section" >
					<div className = "section-title" > {
						this.props.title
					} </div> <div className = "container" >					
						{games}
					</div> </div> );
				}
			});  

 module.exports = GameSection;