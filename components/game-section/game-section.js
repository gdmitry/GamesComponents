var React = require('react');

var GameSection = React.createClass({
			render: function () {
				return ( < div className = "game-section" >
					< div className = "title" > {
						this.props.title
					} < /div> < div className = "container" >  < /div> < /div> );
				}
			});

		module.exports = GameSection;