import React, { Component } from 'react';

export default class VideoCom extends Component {
	state = {
		comments: null,
		textareaComment: '',
	};

	componentDidMount() {
		fetch(
			'http://localhost:8080/api/videos/' + this.props.video.id + '/comments'
		)
			.then(response => response.json())
			.then(data => this.setState({ comments: data }))
			.then(() => console.log(this.state.comments));
	}

	handleSubmit(event) {
		event.preventDefault();

		fetch(
			'http://localhost:8080/api/videos/' + this.props.video.id + '/comments',
			{
				method: 'POST',
				body: JSON.stringify({ content: this.state.textareaComment }),
			}
		).then(
			fetch(
				'http://localhost:8080/api/videos/' + this.props.video.id + '/comments'
			)
				.then(response => response.json())
				.then(data => this.setState({ comments: data }))
		);
		console.log(this.state.textareaComment);
	}

	handleTextareaCommentChange(event) {
		this.setState({ textareaComment: event.target.value });
	}

	getDayMonthYear(date) {
		const year = new Date(date).getFullYear();
		const month = new Date(date).getMonth() + 1;
		const day = new Date(date).getDate();

		return day + '/' + month + '/' + year;
	}

	getHoursMinutesSeconds(date) {
		const hours = new Date(date).getHours();
		const minutes = new Date(date).getMinutes();
		const secondes = new Date(date).getSeconds();

		return hours + ':' + minutes + ':' + secondes;
	}

	render() {
		if (!this.state.comments) {
			return <div className="videoDetail is-loading"></div>;
		}
		return (
			<aside className="commentList">
				<h2>{this.state.comments.length + ' commentaires'}</h2>
				<form
					className="commentForm"
					onSubmit={event => this.handleSubmit(event)}
				>
					<textarea
						name="content"
						rows="2"
						placeholder="Ajouter un commentaire public"
						onChange={e => this.handleTextareaCommentChange(e)}
						value={this.state.textareaComment}
					></textarea>
					<button type="submit">Envoyer</button>
				</form>
				{this.state.comments.map(comment => (
					<article className="commentRenderer" key={comment.id}>
						<time dateTime={comment.created_at}>
							{'Le ' +
								this.getDayMonthYear(comment.created_at) +
								' à ' +
								this.getHoursMinutesSeconds(comment.created_at)}
						</time>
						<p>{comment.content}</p>
					</article>
				))}
			</aside>
		);
	}
}
