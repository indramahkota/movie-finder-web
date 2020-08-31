import css from "./AppBar.css";
import html from "./AppBar.html";
import templateFactory from "../templateFactory";

const template = templateFactory(html, css);

class AppBar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this._textMenu = this.getAttribute("title") || "Movie Finder";
        this.render();
    }

    render() {
        this.shadowRoot.querySelector("#header-title").textContent = this._textMenu;

        if(window.localStorage.getItem('app-dark-mode') === 'dark') {
            this.shadowRoot.querySelector("#header-switch").checked = false;
        } else {
            this.shadowRoot.querySelector("#header-switch").checked = true;
        }

        this.shadowRoot.querySelector("#header-switch").addEventListener('change', this.toggleDarkMode);
    }

    toggleDarkMode(event) {
        if(event.path[0].checked) {
            window.document.body.classList.remove('dark');
            window.localStorage.setItem('app-dark-mode', "light");
        } else {
            window.document.body.classList.add('dark');
            window.localStorage.setItem('app-dark-mode', "dark");
        }
    }
}

customElements.define("app-bar", AppBar);