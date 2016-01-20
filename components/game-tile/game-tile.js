var React = require('react'),
	ReactDOM = require('react-dom'),
	DownloadButton = require('../download-button/download-button'),
	Link = require('react-router').Link;	

var GameTile = React.createClass({	
	getInitialState: function() {
		return {data: this.props.data};
  	},
	componentDidMount: function () {
  		var element = ReactDOM.findDOMNode(this);
 		var infoButton = element.querySelectorAll('.info-button')[0]; 	
 		
	},		
	componentWillReceiveProps: function () {
		//console.log("fuck");
  		//this.setState({data: this.props.data});
	},		
	render: function () {
		return (<tile className = "game-tile small-size">
				<div className="game-summary"> 
					<image className="game-image" src = {this.state.data.imageUrl} />
					<div className="game-title">{this.state.data.title}</div>
					<div className="jackpot">{this.state.data.jackpot ? "Jackpot: "+this.state.data.jackpot : ""}</div>
				</div>
				<div className="game-info"> 
					<div className="game-title">{this.state.data.title}</div>								
					<div className="jackpot">{this.state.data.jackpot ? "Jackpot: "+this.state.data.jackpot : ""}</div>
					<div className="description">Nine chances to win big money.</div>
					<div className="controls">
						<DownloadButton gameId = {this.state.data.gameId} gameState = {this.state.data.state} gameUrl = {this.state.data.gameUrl}/>
						<Link to={`/details/${this.state.data.gameId}`}><div className="info-button">i</div></Link>
					</div>
				</div>
		</tile>);
	}
});

module.exports = GameTile;