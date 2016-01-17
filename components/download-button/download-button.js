var React = require('react'),
	ReactDOM = require('react-dom'),
	addons = require('react-addons'), 
	classSet = addons.classSet,
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
			},
			componentWillUnmount: function () {
  				var element = ReactDOM.findDOMNode(this);
  				element.removeEventListener('click', this.handleClick, false);
  				eventController.unlisten('game-info-change', this.updateContent);	
			},
			handleClick: function () {
				if (this.state.gameState === 'play') {
					console.info('open link in new tab');
					window.open(this.state.gameUrl);
					return;
				}
				if (this.state.gameState === 'download') {
					console.info('download the game');
					eventController.emit('game-info-update', {gameId: this.props.gameId, state: "loading"});
				}  				  				
			},	
			updateContent: function (event) {  		
  				var game = event.detail;
  				if (game.gameId === this.props.gameId && this.isMounted()) {
  					game.state = game.state ||'download';
					this.setState({gameState: game.state, gameUrl: game.gameUrl});  
  				}					  			 			
			},				
			render: function () {
				var classes = classSet({
					'download-button': true,
        			'size-small': this.props.size === 'small',
        			'size-small': !this.props.size,
        			'active': this.state.gameState === 'play',
        			'play': this.state.gameState === 'play',
        			'download': this.state.gameState === 'download',
        			'loading': this.state.gameState === 'loading'
    			});
				return (<div className = {classes}>{this.labels[this.state.gameState]}
							<Spinner/>
				 		</div> );
				}
			});

		module.exports = Button;