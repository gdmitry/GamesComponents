var React = require('react');

var GameTile = React.createClass({			
	render: function () {
		var jackpot;
		if (this.props.data.jackpot) {
			jackpot = <div className="jackpot">Jackpot: {this.props.data.jackpot}</div>;
		}
		return (<tile className = "game-tile small-size">
				<div className="game-summary"> 
					<image className="game-image" src = {this.props.data.imageUrl} />
					<div className="game-title">{this.props.data.title}</div>
					{jackpot}
				</div>
				<div className="game-info"> 
					<div className="game-title">{this.props.data.title}</div>								
					{jackpot}
					<div className="controls">
						
					</div>
				</div>
		</tile>);
	}
});

module.exports = GameTile;