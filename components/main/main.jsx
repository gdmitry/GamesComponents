var React = require('react'),
	ReactDOM = require('react-dom'),
	Route = require('react-router').Route,
	Router = require('react-router').Router,	
	Template = require('../content/content.jsx'),
	GameSections = require('../game-sections/game-sections.jsx'),
	GameDetails = require('../game-details/game-details.jsx');
	
	require('../../modules/EventController');
	require('../../modules/datasourceController');

if (typeof window !== 'undefined') {
	window.onload = function () {	
		ReactDOM.render(<Router>  
			<Route path="/" component={Template}>
		   		<Route path="/showcase"  component={GameSections}/>
		       		<Route path="/details/:gameId" component={GameDetails}/>
		   	 	</Route>      			
		</Router>,	document.getElementsByClassName('react-app')[0]);
		// go to home page
		window.location.hash="showcase";
	}
}