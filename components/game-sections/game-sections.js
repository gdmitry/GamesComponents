var React = require('react'),
	eventController = require('../../modules/eventController'),
	GameSection= require('../game-section/game-section');

var GameSections = React.createClass({			
	 		getInitialState: function() {
    			return {sections: []};
  			},
  			componentDidMount: function () {  				
				eventController.listen('sections-data-change', this.updateContent);
				eventController.emit('sections-data-request');			
			},			
			componentWillUnmount: function () {
  				eventController.unlisten('sections-data-change', this.updateContent);	
			},	
			updateContent: function(event) {
				var sections = event.detail;				
				if (this.isMounted()) {
					this.setState({sections: sections});
				}								
			},
			render: function () {
				var sections = this.state.sections.map(function (section, index) {
					return ( <GameSection section = { section } key = { index }/>);
				});
				return ( <div className = "game-sections" >
							{sections}
						 </div> );
				}
			});  

 module.exports = GameSections;