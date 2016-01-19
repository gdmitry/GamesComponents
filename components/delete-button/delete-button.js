var React = require('react'),
	ReactDOM = require('react-dom'),
	addons = require('react-addons'), 
	classSet = addons.classSet;

var Button = React.createClass({	
			getInitialState: function() {
    			return {gameState: ''};
  			},			
			componentDidMount: function () {  				
  				this.refs.deleteButton.addEventListener('click', this.handleClick, false);
  				Core.listen('game-info-change', this.updateContent);	
			},
			componentWillUnmount: function () {  				
  				this.refs.deleteButton.removeEventListener('click', this.handleClick, false);
  				Core.unlisten('game-info-change', this.updateContent);	
			},
			handleClick: function () {			
				console.info('delete the game');			
				Core.emit('game-info-update', {gameId: this.props.gameId, state: 'download'});			  				
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

				return (<div className = {classes}  ref="deleteButton">Delete</div> );
			}
});

module.exports = Button;