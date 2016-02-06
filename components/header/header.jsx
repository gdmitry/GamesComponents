var React = require('react');

var Header = React.createClass({
			render: function () {
				return (<header className = "header">
							<div className = "left-controls">
								<div className = "games-menu">
									<div className = "name">Games</div>
								</div>
								<div className = "search">
									<div className = "name">Search </div>
								</div>
					 		</div> 
					 		<div className = "right-controls">
					  			<div className = "community">
					  				<div className = "name">Community</div>
					  			</div>
					  		</div>
						</header>);
				}
			});

module.exports = Header;