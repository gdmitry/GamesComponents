var ReactDOM = require('react-dom'),
	Header = require('../header/header.js'),
	Content = require('../content/content.js'),
	Footer = require('../footer/footer.js'),
	React = require('react');

if (typeof window !== 'undefined') {
	window.onload = function () {
		ReactDOM.render(<div className="app">
		 					<div className = "main">
		  						<Header/>
		  						<Content/>
		  					</div>
		  					<Footer/>
		  				</div>,
						document.getElementsByClassName('react-app')[0]);
		}
	}

// to do: rewrite with promises
setTimeout(function() {
	require('../../modules/datasourceController');
}, 300);
