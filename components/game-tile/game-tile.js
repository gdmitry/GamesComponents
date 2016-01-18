var React = require('react'),
	ReactDOM = require('react-dom'),
	DownloadButton = require('../download-button/download-button'),
	Link = require('react-router').Link;	

var GameTile = React.createClass({	
	componentDidMount: function () {
  		var element = ReactDOM.findDOMNode(this);
 		var infoButton = element.querySelectorAll('.info-button')[0];
 		Core.emit('game-info-change', this.props.data);	
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
						<DownloadButton gameId = {this.props.data.gameId} />
						<Link to={`/details/${this.props.data.gameId}`}><div className="info-button">i</div></Link>
					</div>
				</div>
		</tile>);
	}
});

module.exports = GameTile;