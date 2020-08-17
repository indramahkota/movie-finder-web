import css from "./style.css";
import html from "./template.html";
import componentTemplateFactory from "../utilities/componentTemplateFactory";

const template = componentTemplateFactory(html, css);

class SearchBar extends HTMLElement {

    set keyUpEvent(event) {
        this._keyUpEvent = event;
        this.render();
    }

    set clickEvent(event) {
        this._clickEvent = event;
        this.render();
    }

    get clickButton() {
        return this.shadowRoot.querySelector("#searchButtonElement");
    }

    get searchQuery() {
        return this.shadowRoot.querySelector("#searchInputElement").value;
    }

    connectedCallback() {
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.render();
    }

    render() {
        this.shadowRoot.querySelector("#searchInputElement").addEventListener("keyup", this._keyUpEvent);
        this.shadowRoot.querySelector("#searchButtonElement").addEventListener("click", this._clickEvent);
    }
}

customElements.define("search-bar", SearchBar);