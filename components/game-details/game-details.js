var React = require('react'),
DownloadButton = require('../download-button/download-button'),
DeleteButton = require('../delete-button/delete-button'),
eventController = require('../../modules/EventController');

var GameDetails= React.createClass({	
	getInitialState: function() {
		console.log(this.props);
    	return {game: ''};
  	},
	componentDidMount: function () {  		
		eventController.listen('game-info-change', this.updateContent);	
		eventController.emit('game-info-request', {gameId: this.props.params.gameId});				
	},	
	updateContent: function (event) {  		
  		var details = event.detail;
  		if (this.isMounted()) { 					
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
					<div className="game-description">{this.state.game.longDescription}</div>
					<DownloadButton gameId = {this.props.params.gameId} size={'large'}/>
					<DeleteButton gameId = {this.props.params.gameId} size={'large'}/>
				</div>	
			</div>	
		</div>);
	}
});

module.exports = GameDetails;