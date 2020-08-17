import css from "./style.css";
import html from "./template.html";
import componentTemplateFactory from "../utilities/componentTemplateFactory";

const template = componentTemplateFactory(html, css);

class MovieItem extends HTMLElement {

    set movie(movie) {
        if(movie.backdrop_path === null) {
            movie.backdrop_path = "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg";
        } else {
            movie.backdrop_path = `https://image.tmdb.org/t/p/w500//${movie.backdrop_path}`;
        }
        this._movie = movie;
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
}

customElements.define("movie-item", MovieItem);