import css from "./AppBar.css";
import html from "./AppBar.html";
import templateFactory from "../templateFactory";

const template = templateFactory(html, css);

class AppBar extends HTMLElement {

    set textMenu(text) {
        this._textMenu = text;
        this.render();
    }

    set menuClickEvent(event) {
        this._menuClickEvent = event;
        this.render();
    }

    connectedCallback() {
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this._textMenu = this.getAttribute("title") || "Movie Finder";
        this.render();
    }

    render() {
        this.shadowRoot.querySelector("#menuText").textContent = this._textMenu;
        this.shadowRoot.querySelector("#menuButton").addEventListener("click", this._menuClickEvent);
    }
}

customElements.define("app-bar", AppBar);