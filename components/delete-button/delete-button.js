var React = require('react'),
eventController = require('../../modules/EventController');

var Button = React.createClass({				
			componentDidMount: function () {
  				var element = this.getDOMNode();
  				element.classList.add('hidden');
  				element.addEventListener('click', this.handleClick, false);
  				document.addEventListener('game-state-change', this.updateGameState, false);
			},
			handleClick: function () {
				this.props.data.downloaded = false;
				eventController.emit('game-info-change', this.props.data);	
				eventController.emit('game-state-change', {gameId: this.props.data.gameId, state: 'download'});			  				
			},						
			updateGameState: function (event) {  
				var game = event.detail;		
				var element = this.getDOMNode();			
  				if (game.gameId === this.props.data.gameId) {
  					// bad code
  				  (game.state === 'play') ? element.classList.remove('hidden') : element.classList.add('hidden');  					
  				}
			},
			render: function () {
				return (<div className = {"delete-button " + (this.props.size === 'small' ||
						 !this.props.size ? 'size-small' : '')}>Delete</div> );
			}
});

module.exports = Button;