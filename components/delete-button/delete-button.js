var React = require('react'),
	ReactDOM = require('react-dom'),
	addons = require('react-addons'), 
	classSet = addons.classSet,
	eventController = require('../../modules/EventController');

var Button = React.createClass({	
			getInitialState: function() {
    			return {gameState: ''};
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
				console.info('delete the game');			
				eventController.emit('game-info-update', {gameId: this.props.gameId, state: 'download'});			  				
			},		
			updateContent: function (event) {  		
  				var game = event.detail;
  				if (game.gameId === this.props.gameId && this.isMounted()) {
  					game.state = game.state ||'download';
					this.setState({gameState: game.state});  
  				}					  			 			
			},	
			render: function () {
				var classes = classSet({
					'delete-button': true,
        			'size-small': this.props.size === 'small',
        			'size-small': !this.props.size,
        			'active': this.state.gameState === 'play'
    			});

				return (<div className = {classes}>Delete</div> );
			}
});

module.exports = Button;