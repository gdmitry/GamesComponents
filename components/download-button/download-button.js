var React = require('react'),
	ReactDOM = require('react-dom'),
	addons = require('react-addons'), 
	classSet = addons.classSet,
	Spinner = require('../spinner/spinner');	

var Button = React.createClass({	
			labels: {'play': 'Play', 'download': 'Download', 'loading': 'Downloading...'},
			getInitialState: function() {
    			return {gameState: '', gameUrl: ''};
  			},
			componentDidMount: function () {
  				this.refs.downloadButton.addEventListener('click', this.handleClick, false);
  				Core.listen('game-info-change', this.updateContent);	
			},
			componentWillUnmount: function () {
  				this.refs.downloadButton.removeEventListener('click', this.handleClick, false);
  				Core.unlisten('game-info-change', this.updateContent);	
			},
			handleClick: function () {
				if (this.state.gameState === 'play') {
					console.info('open link in new tab');
					window.open(this.state.gameUrl);
					return;
				}
				if (this.state.gameState === 'download') {
					console.info('download the game');
					Core.emit('game-info-update', {gameId: this.props.gameId, state: "loading"});
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
				return (<div className = {classes} ref="downloadButton">{this.labels[this.state.gameState]}
							<Spinner/>
				 		</div> );
				}
			});

		module.exports = Button;