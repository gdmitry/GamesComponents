var React = require('react'),
Spinner = require('../spinner/spinner'),
eventController = require('../../modules/EventController');

var Button = React.createClass({	
			labels: {'play': 'Play', 'download': 'Download', 'progress': 'Downloading...'},
			getInitialState: function() {
				var initState = this.props.data.downloaded ? 'play' : 'download'; 
    			return {state: initState};
  			},
			componentDidMount: function () {
  				var element = this.getDOMNode();
  				element.addEventListener('click', this.handleClick, false);
  				document.addEventListener('game-state-change', this.updateGameState, false);
			},
			handleClick: function () {
				if (this.state.state === 'play') {
					console.info('open link in new tab');
					window.open(this.props.data.gameUrl);
					return;
				}
				if (this.state.state === 'download') {
					console.info('download the game');
					this.setGameStatus('progress');
  					setTimeout(this.setGameStatus.bind(this, 'play'), 5000);
				}  				  				
			},
			setGameStatus: function (gameState) {  				
  				this.setState({state: gameState});  			
  				this.props.data.state = this.state.state;
				//this.props.data.downloaded =(this.state.state === 'play');
				eventController.emit('game-info-change', this.props.data);
  				eventController.emit('game-state-change', {gameId: this.props.data.gameId, state: this.state.state});
			},			
			updateGameState: function (event) {  
				var game = event.detail;					
  				if (game.gameId === this.props.data.gameId && game.state) {
  					this.setState({state: game.state});
  				}
			},
			render: function () {
				return (<div className = {"download-button " + (this.props.size === 'small' || !this.props.size ? 'size-small' : '')+
				' ' + this.state.state}>{this.labels[this.state.state]}
							<Spinner/>
				 		</div> );
				}
			});

		module.exports = Button;