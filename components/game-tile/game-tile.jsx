var React = require('react'),
	ReactDOM = require('react-dom'),
	DownloadButton = require('../download-button/download-button.jsx'),
	Link = require('react-router').Link;	

var GameTile = React.createClass({	
	componentDidMount: function () {
  		var element = ReactDOM.findDOMNode(this);
 		var infoButton = element.querySelectorAll('.info-button')[0]; 	 		
	},		
	render: function () {
		var game = this.props.data;
		return (<tile className = "game-tile small-size">
				<div className="game-summary"> 
					<image className="game-image" src = {game.imageUrl} />
					<div className="game-title">{game.title}</div>
					<div className="jackpot">{game.jackpot ? "Jackpot: " + game.jackpot : ""}</div>
				</div>
				<div className="game-info"> 
					<div className="game-title">{game.title}</div>								
					<div className="jackpot">{game.jackpot ? "Jackpot: "+game.jackpot : ""}</div>
					<div className="description">Nine chances to win big money.</div>
					<div className="controls">
						<DownloadButton gameId = {game.gameId} gameState = {game.state} gameUrl = {game.gameUrl}/>
						<Link to={`/details/${game.gameId}`}><div className="info-button">i</div></Link>
					</div>
				</div>
		</tile>);
	}
});

module.exports = GameTile;