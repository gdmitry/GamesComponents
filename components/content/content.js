var React = require('react'),
	GameSection = require('../game-section/game-section.js');

var Content = React.createClass({
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
				return ( < main className = "content" > < div className = "topbar" > < /div>  < GameSection title="My title" /> < /main> );
				}
			});

		module.exports = Content;