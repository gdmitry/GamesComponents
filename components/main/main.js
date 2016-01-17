var React = require('react'),
	ReactDOM = require('react-dom'),
	Route = require('react-router').Route,
	Router = require('react-router').Router,	
	Template = require('../content/content.js'),
	GameSection = require('../game-section/game-section.js'),
	GameDetails = require('../game-details/game-details.js');

	require('../../modules/datasourceController');

if (typeof window !== 'undefined') {
	window.onload = function () {	
					ReactDOM.render(<Router>  
										<Route path="/" component={Template}>
								       		<Route path="/showcase" title = "Latest games" component={GameSection}/>
								       		<Route path="/details/:gameId" component={GameDetails}/>
							      	 	</Route>      			
							  		</Router>,
							  		document.getElementsByClassName('react-app')[0]);
					}
	}
