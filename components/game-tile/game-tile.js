var React = require('react'),
	DownloadButton = require('../download-button/download-button'),
	eventController = require('../../modules/EventController');

var GameTile = React.createClass({	
	componentDidMount: function () {
  		var element = this.getDOMNode();
 		var infoButton = element.querySelectorAll('.info-button')[0];
 		infoButton.addEventListener('click', this.openGameDetails, false); 		
	},	
	openGameDetails: function () {
		eventController.emit('game-info-change', this.props.data);
		eventController.emit('navigation-change', {url: 'details'});
	},
	render: function () {		
		return (<tile className = "game-tile small-size">
				<div className="game-summary"> 
					<image className="game-image" src = {this.props.data.imageUrl} />
					<div className="game-title">{this.props.data.title}</div>
					<div className="jackpot">{this.props.data.jackpot ? "Jackpot: "+this.props.data.jackpot : ""}</div>
				</div>
				<div className="game-info"> 
					<div className="game-title">{this.props.data.title}</div>								
					<div className="jackpot">{this.props.data.jackpot ? "Jackpot: "+this.props.data.jackpot : ""}</div>
					<div className="description">Nine chances to win big money.</div>
					<div className="controls">
						<DownloadButton data = {this.props.data} />
						<div className="info-button">i</div>
					</div>
				</div>
		</tile>);
	}
});

module.exports = GameTile;