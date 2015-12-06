var React = require('react');

var Header = React.createClass({
	//	handleSubmit: function (e) {
	//		e.preventDefault();
	//		var author = this.refs.author.value.trim();
	//		var text = this.refs.text.value.trim();
	//		if (!text || !author) {
	//			return;
	//		}
	//		this.props.onCommentSubmit({
	//			author: author,
	//			text: text
	//		});
	//		this.refs.author.value = '';
	//		this.refs.text.value = '';
	//		return;
	//	},
	render: function () {
		return ( < header className = "header" >
			< div className = "games-menu" > Games < /div> < /header > );
	}
});

module.exports = Header;