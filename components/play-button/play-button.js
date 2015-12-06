var React = require('react');

var playButton = React.createClass({

			render: function () {
				return ( < button type = "button" > this.props.text < /button>);
				}

			});

		module.exports = playButton;