var React = require('react');	

var Spinner = React.createClass({	
	render: function () {
		var classes = "spinner-wrapper " + (this.props.status !== 'active' ? 'hidden':'');
		return (<div className={classes} >
					<div className="spinner">
						<div className="track ui-theme-spinner-track"></div>
						<div className="circle ui-theme-spinner-circle"></div>
					</div>
				</div>);
	}
});

module.exports = Spinner;