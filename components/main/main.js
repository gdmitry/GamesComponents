var ReactDOM = require('react-dom'),
	Header = require('../header/header.js'),
	Content = require('../content/content.js'),
	Footer = require('../footer/footer.js'),
	React = require('react');

if (typeof window !== 'undefined') {
	window.onload = function () {
		ReactDOM.render( < div className = "main" > < Header /> < Content /> < Footer /> </div> , document.getElementsByTagName('body')[0]);
		}
	}