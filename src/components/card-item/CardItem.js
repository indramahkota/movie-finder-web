import css from "./CardItem.css";
import html from "./CardItem.html";
import templateFactory from "../templateFactory";

const template = templateFactory(html, css);

class CardItem extends HTMLElement {
    
    set data(data) {
        this._data = data;
        this.render();
    }

    connectedCallback() {
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    render() {
        this.shadowRoot.querySelector("h2").textContent = this._data.title;
        this.shadowRoot.querySelector("p").textContent = this._data.overview;
    }
}

customElements.define("card-item", CardItem);