var React = require('react'),	
	GameSection= require('../game-section/game-section');

var GameSections = React.createClass({			
	 		getInitialState: function() { 
    			return {sections: []};
  			},
  			componentDidMount: function () {  				
				Core.listen('sections-data-change', this.updateContent);
				Core.emit('sections-data-request');							
			},			
			componentWillUnmount: function () {
  				Core.unlisten('sections-data-change', this.updateContent);	
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