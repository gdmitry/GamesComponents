var React = require('react'),
DownloadButton = require('../download-button/download-button.jsx'),
DeleteButton = require('../delete-button/delete-button.jsx');

var GameDetails= React.createClass({	
	getInitialState: function() {
    	return {game: ''};
  	},
	componentDidMount: function () {  		
		Core.listen('game-info-change', this.updateContent);	
		Core.emit('game-info-request', {gameId: this.props.params.gameId});		
	},	
	componentWillUnmount: function () {  			
  		Core.unlisten('game-info-change', this.updateContent);	
	},
	updateContent: function (event) {  		
  		var details = event.detail;
  		if (this.isMounted() && this.props.params.gameId === details.gameId) { 					
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
					<DownloadButton gameId = {this.state.game.gameId} gameState = {this.state.game.state} size={'large'}/>
					<DeleteButton gameId = {this.state.game.gameId} gameState = {this.state.game.state}  gameUrl = {this.state.game.gameUrl} size={'large'}/>
				</div>	
			</div>			
		</div>);
	}
});

module.exports = GameDetails;