var React = require('react'),
	ReactDOM = require('react-dom'),
	addons = require('react-addons'), 
	classSet = addons.classSet;

var Button = React.createClass({							
			componentDidMount: function () {  				
  				this.refs.deleteButton.addEventListener('click', this.handleClick, false);  					
			},
			componentWillUnmount: function () {  				
  				this.refs.deleteButton.removeEventListener('click', this.handleClick, false);  				
			},
			handleClick: function () {			
				console.info('delete the game');			
				Core.emit('game-info-update', {gameId: this.props.gameId, state: 'download'});			  				
			},		
				
			render: function () {
				var classes = classSet({
					'delete-button': true,
        			'size-small': this.props.size === 'small',
        			'size-small': !this.props.size,
        			'active': this.props.gameState === 'play'
    			});

				return (<div className = {classes}  ref="deleteButton">Delete</div> );
			}
});

module.exports = Button;