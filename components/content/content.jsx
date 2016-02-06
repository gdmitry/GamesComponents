var React = require('react'),
	Header = require('../header/header.jsx'),
	Footer = require('../footer/footer.jsx');

var Template = React.createClass({		
	render: function () {	
		return (<div className="app">
					<div className = "main">
						<Header/>
						<main className = "content">
				 			<div className = "topbar"></div>
			 				{this.props.children}
						</main>
					</div>
					<Footer/>
		  		</div>);
	}
});

module.exports = Template;

