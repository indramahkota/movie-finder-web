import css from "./MovieList.css";
import html from "./MovieList.html";
import templateFactory from "../templateFactory";

const template = templateFactory(html, css);

class MovieList extends HTMLElement {
    set movies(movies) {
        this._movies = movies;
        this.render();
    }

    connectedCallback() {
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    render() {
        this.shadowRoot.querySelector(".placeholder").innerHTML = "";
        this._movies.forEach(movie => {
            const movieItemElement = document.createElement("movie-item");
            this.shadowRoot.querySelector(".placeholder").appendChild(movieItemElement);
            movieItemElement.movie = movie
        });
    }

    renderError(message) {
        this.shadowRoot.querySelector(".placeholder").innerHTML = message;
    }
}

customElements.define("movie-list", MovieList);