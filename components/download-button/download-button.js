var React = require('react'),
	ReactDOM = require('react-dom'),
	addons = require('react-addons'), 
	classSet = addons.classSet,
	Spinner = require('../spinner/spinner');	

var Button = React.createClass({	
			labels: {
				'play': 'Play',
				'download': 'Download',
				'loading': 'Downloading...'
			},		  				
			componentDidMount: function () {				
  				this.refs.downloadButton.addEventListener('click', this.handleClick, false);
			},
			componentWillUnmount: function () {
  				this.refs.downloadButton.removeEventListener('click', this.handleClick, false);
			},
			handleClick: function () {
				var gameState = this.props.gameState;
				switch (gameState) {
					case 'play': 
						console.info('open link in new tab');
						window.open(this.props.gameUrl);
						break;					
					case undefined:
					case 'download': 
						console.info('download the game');
						Core.emit('game-info-update', {gameId: this.props.gameId, state: "loading"});
						break;					
				}							  				
			},							
			render: function () {
				var buttonText = this.labels[this.props.gameState || 'download'];
				var classes = classSet({
					'download-button': true,
        			'size-small': this.props.size === 'small',
        			'size-small': !this.props.size,
        			'active': this.props.gameState === 'play',
        			'play': this.props.gameState === 'play',
        			'download': this.props.gameState === 'download' || !this.props.gameState,
        			'loading': this.props.gameState === 'loading'
    			});
				return (<div className = {classes} ref="downloadButton">{buttonText}
							<Spinner status={this.props.gameState === 'loading' ? 'active' : ''} />
				 		</div> );
				}
			});

		module.exports = Button;