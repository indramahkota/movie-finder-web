import css from "./MovieItem.css";
import html from "./MovieItem.html";
import templateFactory from "../templateFactory";

const template = templateFactory(html, css);

class MovieItem extends HTMLElement {
    set movie(movie) {
        if(movie.backdrop_path === null) {
            movie.backdrop_path = "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg";
        } else {
            movie.backdrop_path = `https://image.tmdb.org/t/p/w500//${movie.backdrop_path}`;
        }
        this._movie = movie;

        if(movie.isError) {
            this.renderError();
            return;
        }
        this.render();
    }

    connectedCallback() {
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    render() {
        this.shadowRoot.querySelector("img").src = this._movie.backdrop_path;
        this.shadowRoot.querySelector("h2").textContent = this._movie.title;
        this.shadowRoot.querySelector("p").textContent = this._movie.overview;
    }

    renderError() {
        this.shadowRoot.querySelector("img").style.display = 'none';
        this.shadowRoot.querySelector("p").style.display = 'none';
        this.shadowRoot.querySelector("h2").textContent = this._movie.errMessage;
    }
}

customElements.define("movie-item", MovieItem);