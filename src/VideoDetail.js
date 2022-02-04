import { createRef, Component } from 'react';
import VideoCom from './VideoCom';

export default class VideoDetail extends Component {
	state = {
		video: null,
	};
	player = createRef();

	componentDidMount() {
		fetch('http://localhost:8080/api/videos/' + this.props.params.id)
			.then(response => response.json())
			.then(video => this.setState({ video }));
	}

	render() {
		if (!this.state.video) {
			return <div className="videoDetail is-loading"></div>;
		}
		const { title, description, file, likes, dislikes } = this.state.video;
		return (
			<div className="videoDetail">
				<button
					className="backButton"
					onClick={() => this.props.navigate('list')}
				>
					&lt; Retour
				</button>
				<video
					style={{ width: '100%', backgroundColor: 'black' }}
					height="400"
					controls
					src={'./uploads/' + file}
					ref={this.player}
				></video>
				<button onClick={() => this.player.current.play()}>play</button>
				<button onClick={() => this.player.current.pause()}>pause</button>
				<header>
					<h1>{title}</h1>
					<div className="likesContainer">
						<button className="like" onClick={() => this.handleLikeClick()}>
							{likes}
						</button>
						<button
							className="dislike"
							onClick={() => this.handleDislikeClick()}
						>
							{dislikes}
						</button>
					</div>
				</header>
				{description && <p>{description}</p>}
				<VideoCom video={this.state.video} />
			</div>
		);
	}

	handleLikeClick() {
		const { video } = this.state;

		fetch('http://localhost:8080/api/videos/' + this.props.params.id)
			.then(response => response.json())
			.then(data => (video.likes = data.likes));

		const likeAdd = JSON.stringify({
			likes: video.likes + 1,
		});

		fetch('http://localhost:8080/api/videos/' + video.id + '/likes', {
			method: 'POST',
			body: likeAdd,
		}).then(response => {
			if (response.ok) {
				fetch('http://localhost:8080/api/videos/' + this.props.params.id)
					.then(response => response.json())
					.then(data => {
						this.setState({
							video: {
								...this.state.video,
								likes: data.likes,
							},
						});
					});
			}
		});
	}

	handleDislikeClick() {
		const { video } = this.state;

		fetch('http://localhost:8080/api/videos/' + this.props.params.id)
			.then(response => response.json())
			.then(data => (video.dislikes = data.dislikes));

		const dislikeAdd = JSON.stringify({
			dislikes: video.dislikes + 1,
		});
		fetch('http://localhost:8080/api/videos/' + video.id + '/dislikes', {
			method: 'POST',
			body: dislikeAdd,
		}).then(response => {
			if (response.ok) {
				fetch('http://localhost:8080/api/videos/' + this.props.params.id)
					.then(response => response.json())
					.then(data => {
						this.setState({
							video: {
								...this.state.video,
								dislikes: data.dislikes,
							},
						});
					});
			}
		});
	}
}
