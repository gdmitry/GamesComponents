var React = require('react');	

var Spinner = React.createClass({	
	componentDidMount: function () {
  		
	},		
	render: function () {
		return (<div className="spinner-wrapper">
					<div className="spinner">
						<div className="track ui-theme-spinner-track"></div>
						<div className="circle ui-theme-spinner-circle"></div>
					</div>
				</div>);
	}
});

module.exports = Spinner;