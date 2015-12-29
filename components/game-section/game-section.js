var React = require('react');
var eventController = require('../modules/EventController');

var GameSection = React.createClass({
			render: function () {
				return ( < div className = "game-section" >
					< div className = "title" > {
						this.props.title
					} < /div> < div className = "container" >  < /div > < /div> );
				}
			});

		eventController.listen('section-data-change', function (data) {

		}); module.exports = GameSection;