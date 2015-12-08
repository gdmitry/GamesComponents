var React = require('react');

var Header = React.createClass({
			render: function () {
				return ( < header className = "header" >
					< div className = "left-controls" >
					< div className = "games-menu" > Games < /div> < div className = "search" > Search < /div > < /div> < div className = "right-controls" > < div className = "community" > Community < /div> < /div >

					< /header> );
				}
			});

		module.exports = Header;