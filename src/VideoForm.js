import React, {Component} from "react";

export default class VideoForm extends Component {
    titreInput = React.createRef();
    descriptionInput = React.createRef();
    thumbnailInput = React.createRef();

    handleSubmit(event) {
        event.preventDefault();
        console.log(
            "Titre : " + this.titreInput.current.value +
            "\nDescription : " + this.descriptionInput.current.value +
            "\nthumbnail : " + this.thumbnailInput.current.value
        )
        const form = JSON.stringify({
            title:this.titreInput.current.value,
            description:this.descriptionInput.current.value,
            thumbnail:this.thumbnailInput.current.value
        });
        fetch("http://localhost:8080/api/videos", {
            method: "POST",
            body: form
        }).then((response) => response.json())
            .then(responseJson => this.props.navigate('detail', { id: responseJson.id }));
    };

    handleButtonEnter(event) {
        if (event.key === 13) {
            event.preventDefault();
            this.handleSubmit(event);
        }
    };

    render() {
        return (
            <form className="videoForm"
                  onSubmit={event => this.handleSubmit(event)}
                  onKeyPress={event => this.handleButtonEnter(event)}>
                <label htmlFor="title">Titre</label>
                <input
                    required
                    type="text"
                    id="title"
                    ref={this.titreInput}
                />
                <label htmlFor="description">Description</label>
                <textarea
                    required
                    id="description"
                    cols="30"
                    rows="10"
                    ref={this.descriptionInput}
                >
                </textarea>
                <label htmlFor="thumbnail">
                    Vignette
                    <small>
                        id de l'image sur
                        <a href="https://unsplash.com" target="_blank">
                            https://unsplash.com
                        </a>
                    </small>
                </label>
                <input
                    required
                    type="text"
                    id="thumbnail"
                    ref={this.thumbnailInput}
                />
                <button type="submit">Envoyer</button>
            </form>
        )
    }
}