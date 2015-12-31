var React = require('react');
var eventController = require('../../modules/EventController');

var GameSection = React.createClass({
	 		getInitialState: function() {
    			return {data: ['']};
  			},
  			componentDidMount: function () {
  				var self = this;
				eventController.listen('section-data-change', function (data) {
					var detail = data.detail;
					self.setState({data: detail});
				},false);
				
			},
			render: function () {
				return ( <div className = "game-section" >
					<div className = "title" > {
						this.props.title
					} </div> <div className = "container" >					
						{this.state.data[0].title}
					</div> </div> );
				}
			});  

	

 module.exports = GameSection;