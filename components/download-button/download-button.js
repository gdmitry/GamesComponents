var React = require('react'),
	ReactDOM = require('react-dom'),
Spinner = require('../spinner/spinner'),
eventController = require('../../modules/EventController');

var Button = React.createClass({	
			labels: {'play': 'Play', 'download': 'Download', 'loading': 'Downloading...'},

			getInitialState: function() {
    			return {gameState: '', gameUrl: ''};
  			},
			componentDidMount: function () {
  				var element = ReactDOM.findDOMNode(this);
  				element.addEventListener('click', this.handleClick, false);
  				eventController.listen('game-info-change', this.updateContent);	
				eventController.emit('game-info-request', {gameId: this.props.gameId});
			},
			handleClick: function () {
				console.log(this.state);
				if (this.state.gameState === 'play') {
					console.info('open link in new tab');
					window.open(this.state.gameUrl);
					return;
				}
				if (this.state.gameState === 'download') {
					console.info('download the game');
					eventController.emit('game-state-change', {gameId: this.props.gameId, state: "loading"});
				}  				  				
			},	
			updateContent: function (event) {  		
  				var game = event.detail;
  				if (game.gameId === this.props.gameId && this.isMounted()) {
  					game.state = game.state ||'download';
					this.setState({gameState: game.state, gameUrl: game.Url});  
  				}					  			 			
			},				
			render: function () {
				return (<div className = {"download-button " + (this.props.size === 'small' || !this.props.size ? 'size-small' : '')+
				' ' + (this.state.gameState)}>{this.labels[this.state.gameState]}
							<Spinner/>
				 		</div> );
				}
			});

		module.exports = Button;