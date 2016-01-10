var React = require('react'),
DownloadButton = require('../download-button/download-button'),
DeleteButton = require('../delete-button/delete-button'),
eventController = require('../../modules/EventController');

var GameDetails= React.createClass({	
	getInitialState: function() {
    	return {game: ''};
  	},
	componentDidMount: function () {  		
  		var element = this.getDOMNode();  		
  		element.classList.add('hidden');		
		eventController.listen('game-info-change', this.updateContent);			
		eventController.listen('navigation-change', this.changeLayout);
	},
	changeLayout: function (event) {  		
 		var details = event.detail;
 			var element = this.getDOMNode();
 		if (details.url === 'details') { 		
  			element.classList.remove('hidden');
  			this.active = true;
  			eventController.emit('game-state-change', {gameId: this.state.game.gameId, state: this.state.game.state || 'download'});
 		}else{
 			element.classList.add('hidden');	
 			this.active = false;
 		}
	},	
	updateContent: function (event) {  		
  		var details = event.detail;  	
  		if(!this.active || this.active && this.state.game && this.state.game.gameId === details.gameId) {
  			this.setState({game: details});  
  		}  			
	},	
	render: function () {		
		return (<div className = "game-details">
			<div className="top-container">
				<image className="game-image" src = {this.state.game.imageDetailUrl} />
				<div className="game-info">
					<div className="game-title">{this.state.game.title}</div>
					<div className="jackpot">{this.state.game.jackpot ? "Jackpot: " + this.state.game.jackpot : ""}</div>
					<div className="game-description">{this.state.game.description}</div>
					<DownloadButton data = {this.state.game} size={'large'}/>
					<DeleteButton data = {this.state.game} size={'large'}/>
				</div>	
			</div>	

		</div>);
	}
});

module.exports = GameDetails;