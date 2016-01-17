var React = require('react'),
ReactDOM = require('react-dom'),
eventController = require('../../modules/EventController');

var Button = React.createClass({	
			getInitialState: function() {
    			return {gameState: ''};
  			},			
			componentDidMount: function () {
  				var element = ReactDOM.findDOMNode(this);
  				element.addEventListener('click', this.handleClick, false);
  				eventController.listen('game-info-change', this.updateContent);	
				eventController.emit('game-info-request', {gameId: this.props.gameId});
			},
			handleClick: function () {						
				eventController.emit('game-state-change', {gameId: this.props.gameId, state: 'download'});			  				
			},		
			updateContent: function (event) {  		
  				var game = event.detail;
  				if (game.gameId === this.props.gameId && this.isMounted()) {
  					game.state = game.state ||'download';
					this.setState({gameState: game.state});  
  				}					  			 			
			},	
			render: function () {
				return (<div className = {"delete-button " + (this.props.size === 'small' ||
						 !this.props.size ? 'size-small' : '') + " " 
						 + (this.state.gameState === 'play' ? 'active' : '')}>Delete</div> );
			}
});

module.exports = Button;